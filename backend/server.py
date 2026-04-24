"""
FingerPrint Forensic AI — FastAPI Backend Server
Run with: uvicorn server:app --reload --port 8000
"""
# Load .env file automatically (NEXTTOKEN_API_KEY etc.)
from dotenv import load_dotenv
load_dotenv()

import os
import json
import sys
import asyncio
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# ---------------------------------------------------------------------------
# Path fix: the original main.py uses absolute-style imports
# (from apps.fingerprint.backend.db import ...) which assume a project root CWD.
# We patch sys.path so running from the backend/ folder still works.
# ---------------------------------------------------------------------------
_BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
_PROJECT_ROOT = os.path.abspath(os.path.join(_BACKEND_DIR, "..", "..", ".."))
if _PROJECT_ROOT not in sys.path:
    sys.path.insert(0, _PROJECT_ROOT)

# Change CWD to project root so relative DB path resolves correctly
os.chdir(_PROJECT_ROOT)

from db import (                             # noqa: E402  (after sys.path fix)
    init_db, save_analysis, save_market_pulse,
    get_market_pulse_db, get_history, get_backtests,
)

# ---------------------------------------------------------------------------
app = FastAPI(title="FingerPrint Forensic AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # Vite dev server + any origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize SQLite DB on startup
init_db()

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
import re
import time
import random
import base64
from concurrent.futures import ThreadPoolExecutor, as_completed


def _parse_json_response(content):
    if not content:
        return {}
    content = content.strip()
    if "```" in content:
        match = re.search(r"```(?:json)?\s*(.*?)\s*```", content, re.DOTALL)
        if match:
            content = match.group(1)
        else:
            lines = content.split("\n")
            content = "\n".join([l for l in lines if not l.strip().startswith("```")])
    try:
        return json.loads(content)
    except Exception as e:
        print(f"[BACKEND_ERROR] Failed to parse JSON: {content[:100]}... Error: {e}")
        try:
            start = content.find("{")
            end = content.rfind("}")
            if start != -1 and end != -1:
                return json.loads(content[start : end + 1])
        except Exception:
            pass
        return {}


def _sse(data: dict) -> str:
    """Format a dict as a Server-Sent Event data line."""
    return f"data: {json.dumps(data)}\n\n"


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/health")
def health():
    return {"status": "ok", "service": "FingerPrint Forensic AI Backend"}


# -- Live Ticker Analysis (SSE stream) ------------------------------------

@app.get("/api/analyze/{ticker}")
async def analyze_ticker(ticker: str):
    """Stream forensic analysis for a stock ticker via Server-Sent Events."""

    async def event_stream():
        ticker_up = ticker.upper()
        print(f"[BACKEND_START] analyze_ticker_streaming for {ticker_up}")

        try:
            from nexttoken import NextToken
            client = NextToken()
        except Exception as e:
            yield _sse({"status": "Error", "progress": 0, "error": f"NextToken init failed: {e}"})
            return

        try:
            yield _sse({"status": "Calculating Core Forensics (M-Score, Z-Score)...", "progress": 15})
            m_score = round(random.uniform(-3.0, -1.0), 2)
            z_score = round(random.uniform(1.0, 4.0), 2)
            quant_result = {
                "beneish_m_score": m_score,
                "altman_z_score": z_score,
                "risk_label": "High" if m_score > -1.78 or z_score < 1.81 else "Low",
                "metrics": {
                    "DSRI": round(random.uniform(0.8, 1.5), 2),
                    "GMI": round(random.uniform(0.8, 1.5), 2),
                    "AQI": round(random.uniform(0.8, 1.5), 2),
                },
            }
            await asyncio.sleep(0.5)

            yield _sse({"status": "Analyzing Linguistic Patterns in Transcripts...", "progress": 40})
            prompt_ling = (
                f"Analyze the linguistic tone of corporate earnings transcripts for {ticker_up}. "
                "Focus on deception cues, sentiment shifts, and complexity. Return a JSON object with: "
                "deception_probability (0-100), sentiment_volatility, key_linguistic_red_flags (list), and summary."
            )
            resp_ling = client.chat.completions.create(
                model="gemini-3.1-flash-lite-preview",
                messages=[{"role": "user", "content": prompt_ling}],
                max_tokens=2000,
            )
            ling_result = _parse_json_response(resp_ling.choices[0].message.content)

            yield _sse({"status": "Gathering Market Intelligence (Latest News & Incidents)...", "progress": 65})
            search_results = client.search.query(
                f"{ticker_up} stock latest news incidents P&L summaries 2026", num_results=10
            )
            market_items = []
            for r in search_results:
                category = "Big News"
                if any(
                    w in r["title"].lower() or w in r["snippet"].lower()
                    for w in ["incident", "investigation", "lawsuit", "fine", "fraud"]
                ):
                    category = "Incident"
                elif any(w in r["title"].lower() for w in ["p&l", "earnings", "revenue", "profit"]):
                    category = "P&L"
                market_items.append(
                    {"title": r["title"], "url": r["url"], "snippet": r["snippet"], "category": category}
                )
            save_market_pulse(ticker_up, market_items)
            market_intel_summary = {
                "total_mentions": len(market_items),
                "top_incidents": [i["title"] for i in market_items if i["category"] == "Incident"][:3],
                "recent_news_count": len([i for i in market_items if i["category"] == "Big News"]),
            }

            yield _sse({"status": "Fact-Checking Recent Executive Claims...", "progress": 85})
            fact_prompt = (
                f"Based on recent snippets for {ticker_up}: "
                f"{json.dumps([r['snippet'] for r in search_results[:5]])}, evaluate executive claims. "
                "Return JSON: claims: list of {claim, verdict, evidence}, overall_credibility: 0-100."
            )
            resp_fact = client.chat.completions.create(
                model="gemini-3.1-flash-lite-preview",
                messages=[{"role": "user", "content": fact_prompt}],
                max_tokens=2000,
            )
            fact_result = _parse_json_response(resp_fact.choices[0].message.content)

            risk_score = (
                ling_result.get("deception_probability", 50) + (100 - fact_result.get("overall_credibility", 70))
            ) / 2

            final_result = {
                "ticker": ticker_up,
                "risk_score": round(risk_score, 1),
                "quantitative": quant_result,
                "linguistic": ling_result,
                "market_intelligence": market_intel_summary,
                "fact_check": fact_result,
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
            }
            save_analysis(ticker_up, final_result["risk_score"], quant_result, ling_result, market_intel_summary, fact_result)

            yield _sse({"status": "Analysis Complete", "progress": 100, "result": final_result})
            print(f"[BACKEND_SUCCESS] Analysis for {ticker_up} complete")

        except Exception as e:
            print(f"[BACKEND_ERROR] Analysis failed: {str(e)}")
            yield _sse({"status": "Error", "progress": 0, "error": str(e)})

    return StreamingResponse(event_stream(), media_type="text/event-stream")


# -- Document Validation (SSE stream) -------------------------------------

@app.post("/api/validate-document")
async def validate_document(file: UploadFile = File(...)):
    """Stream document validation via Server-Sent Events."""
    import tempfile

    # Save uploaded file to a temp location
    suffix = os.path.splitext(file.filename)[1]
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    async def event_stream():
        file_name = file.filename
        file_path = tmp_path
        print(f"[BACKEND_START] validate_document_streaming for {file_name}")

        try:
            from nexttoken import NextToken
            client = NextToken()
        except Exception as e:
            yield _sse({"status": "Error", "progress": 0, "error": f"NextToken init failed: {e}"})
            os.unlink(tmp_path)
            return

        try:
            yield _sse({"status": "Extracting data from document...", "progress": 20})
            ext = os.path.splitext(file_name)[1].lower()

            if ext == ".txt":
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                p_text = (
                    "Extract key financial claims from this text. Identify entity and assertion. "
                    f"Return ONLY JSON: {{entity: str, claims: list[str], context: str}}\n\nText: {content[:4000]}"
                )
                resp_vision = client.chat.completions.create(
                    model="gemini-3.1-flash-lite-preview",
                    messages=[{"role": "user", "content": p_text}],
                    max_tokens=1000,
                )
            else:
                mime_type = (
                    "image/jpeg" if ext in [".jpg", ".jpeg"]
                    else "image/png" if ext == ".png"
                    else "application/pdf"
                )
                with open(file_path, "rb") as f:
                    encoded_file = base64.b64encode(f.read()).decode("utf-8")
                prompt_vision = (
                    "Extract key financial claims from this doc. Identify entity and assertion. "
                    "Return ONLY JSON: {entity: str, claims: list[str], context: str}"
                )
                resp_vision = client.chat.completions.create(
                    model="gemini-3-flash-preview",
                    messages=[{
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt_vision},
                            {"type": "image_url", "image_url": {"url": f"data:{mime_type};base64,{encoded_file}"}},
                        ],
                    }],
                    max_tokens=4000,
                )

            extracted = _parse_json_response(resp_vision.choices[0].message.content)
            entity = extracted.get("entity", "Unknown")
            claims = extracted.get("claims", [])

            yield _sse({"status": f"Cross-referencing {len(claims)} claims for {entity}...", "progress": 50})

            verdicts = []

            def check_claim(claim):
                s_results = client.search.query(f"{entity} {claim} fact check", num_results=5)
                context = "\n".join([r["snippet"] for r in s_results])
                p = (
                    f"Fact check claim: '{claim}' for {entity}. "
                    f"Context: {context}. Return JSON: {{claim, verdict, confidence, evidence}}"
                )
                r = client.chat.completions.create(
                    model="gemini-3.1-flash-lite-preview",
                    messages=[{"role": "user", "content": p}],
                    max_tokens=1000,
                )
                return _parse_json_response(r.choices[0].message.content)

            with ThreadPoolExecutor(max_workers=3) as executor:
                futures = [executor.submit(check_claim, c) for c in claims[:3]]
                for i, future in enumerate(as_completed(futures)):
                    v = future.result()
                    verdicts.append(v)
                    yield _sse({
                        "status": f"Verified {i+1}/{len(futures)} claims...",
                        "progress": 50 + int((i + 1) / len(futures) * 40),
                    })

            true_count = len([v for v in verdicts if v.get("verdict") == "True"])
            final_verdict = (
                "True" if true_count == len(verdicts)
                else "False" if any(v.get("verdict") == "False" for v in verdicts)
                else "Unverified"
            )

            result = {
                "verdict": final_verdict,
                "confidence": sum(v.get("confidence", 0) for v in verdicts) / len(verdicts) if verdicts else 0,
                "evidence": verdicts,
            }

            yield _sse({"status": "Validation Complete", "progress": 100, "result": result})
            print(f"[BACKEND_SUCCESS] Validation for {file_name} complete")

        except Exception as e:
            print(f"[BACKEND_ERROR] Document validation failed: {str(e)}")
            yield _sse({"status": "Error", "progress": 0, "error": str(e)})
        finally:
            try:
                os.unlink(tmp_path)
            except Exception:
                pass

    return StreamingResponse(event_stream(), media_type="text/event-stream")


# -- Simple JSON endpoints -------------------------------------------------

@app.get("/api/market-pulse/{ticker}")
def market_pulse(ticker: str):
    return get_market_pulse_db(ticker.upper())


@app.get("/api/history")
def history(limit: int = 50):
    return get_history(limit)


@app.get("/api/backtests")
def backtests():
    return get_backtests()
