/**
 * api.ts — FingerPrint Forensic AI
 *
 * Connects the React frontend to the FastAPI backend running at localhost:8000.
 * Replaces the original NextToken platform RPC layer with direct REST calls.
 */

const BASE_URL = "http://localhost:8000";

// ---------------------------------------------------------------------------
// Function-name → REST endpoint mapping
// ---------------------------------------------------------------------------
const RPC_MAP: Record<string, string> = {
  get_analysis_history: "/api/history",
  get_backtest_cases:   "/api/backtests",
};

// ---------------------------------------------------------------------------
// Cache helpers (session storage)
// ---------------------------------------------------------------------------
function cacheKey(func: string, args: Record<string, any>): string {
  return `rpc:${func}:${JSON.stringify(args)}`;
}

function getCached<T>(key: string): T | undefined {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return undefined;
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

function setCache(key: string, data: unknown): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Storage full or unavailable — ignore
  }
}

/**
 * Clear cached query results.
 * @param funcNames Specific function names to invalidate. Omit to clear all.
 */
export function invalidateCache(funcNames?: string[]): void {
  const keysToRemove: string[] = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key && key.startsWith("rpc:")) {
      if (!funcNames || funcNames.some((fn) => key.includes(`:${fn}:`))) {
        keysToRemove.push(key);
      }
    }
  }
  keysToRemove.forEach((k) => sessionStorage.removeItem(k));
  console.log("[CACHE_INVALIDATE]", { funcs: funcNames || "*", cleared: keysToRemove.length });
}

// ---------------------------------------------------------------------------
// rpcCall — maps named functions to REST GET endpoints
// ---------------------------------------------------------------------------
export async function rpcCall<T = any>({
  func,
  args = {},
}: {
  func: string;
  args?: Record<string, any>;
  module?: string; // ignored — kept for signature compatibility
}): Promise<T> {
  const key = cacheKey(func, args);

  const cached = getCached<T>(key);
  if (cached !== undefined) {
    console.log("[CACHE_HIT]", { func });
    // Background refresh
    _fetchRpc<T>(func, args)
      .then((fresh) => setCache(key, fresh))
      .catch(() => {});
    return cached;
  }

  console.log("[FETCH_START]", { func });
  const data = await _fetchRpc<T>(func, args);
  setCache(key, data);
  return data;
}

async function _fetchRpc<T>(func: string, args: Record<string, any>): Promise<T> {
  const path = RPC_MAP[func];
  if (!path) {
    throw new Error(`[API] Unknown RPC function: "${func}". Add it to RPC_MAP in api.ts.`);
  }

  // Build query string from args (e.g. { limit: 5 } → ?limit=5)
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null) params.set(k, String(v));
  }
  const url = `${BASE_URL}${path}${params.toString() ? `?${params}` : ""}`;

  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    const text = await res.text();
    console.error("[FETCH_ERROR]", res.status, text.slice(0, 200));
    throw new Error(`Request failed (${res.status}): ${text.slice(0, 100)}`);
  }

  const data = await res.json();
  console.log("[FETCH_SUCCESS]", { func, count: Array.isArray(data) ? data.length : 1 });
  return data as T;
}

// ---------------------------------------------------------------------------
// streamCall — SSE streaming for ticker analysis
// ---------------------------------------------------------------------------
export async function streamCall({
  func,
  args = {},
  onChunk,
  onError,
}: {
  func: string;
  args?: Record<string, any>;
  onChunk: (chunk: any) => void;
  onError?: (error: Error) => void;
}): Promise<void> {
  console.log("[STREAM_START]", { func });

  try {
    let response: Response;

    if (func === "analyze_ticker_streaming") {
      // GET /api/analyze/{ticker}  (SSE)
      const ticker = ((args.ticker as string) || "").toUpperCase();
      if (!ticker) throw new Error("ticker is required for analyze_ticker_streaming");
      const url = `${BASE_URL}/api/analyze/${encodeURIComponent(ticker)}`;
      response = await fetch(url, { method: "GET", headers: { Accept: "text/event-stream" } });

    } else if (func === "validate_document_streaming") {
      // POST /api/validate-document  (SSE, multipart form)
      const file: File | undefined = args.file as File | undefined;
      if (!file) throw new Error("args.file (File object) is required for validate_document_streaming");
      const form = new FormData();
      form.append("file", file, file.name);
      const url = `${BASE_URL}/api/validate-document`;
      response = await fetch(url, { method: "POST", body: form, headers: { Accept: "text/event-stream" } });

    } else {
      throw new Error(`[API] Unknown stream function: "${func}"`);
    }


    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Stream request failed (${response.status}): ${text.slice(0, 100)}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("Stream reader not available");

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const chunk = JSON.parse(line.slice(6));
            console.log("[STREAM_CHUNK]", chunk);
            onChunk(chunk);
          } catch (e) {
            console.error("[STREAM_PARSE_ERROR]", e);
          }
        }
      }
    }

    console.log("[STREAM_DONE]", { func });
  } catch (err: any) {
    console.error("[STREAM_ERROR]", err);
    if (onError) onError(err);
    throw err;
  }
}
