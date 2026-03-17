# FingerPrint--Forensic-Ai-

# 🔍 FingerPrint — Frontend

AI-powered corporate fraud detection platform. Built with React + Vite + Tailwind.

## Pages

| Route | Page |
|-------|------|
| `/` | Landing Page |
| `/dashboard` | Command Center |
| `/results/:ticker` | Audit Results (e.g. `/results/TSLA`) |
| `/archive` | Intelligence Archive |
| `/compare` | Dual Comparison |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

## Build for Production

```bash
npm run build
npm run preview
```

## Tech Stack

- **React 18** + React Router v6
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Recharts** (radar chart on Compare page)
- **Google Fonts**: Syne (display) + DM Sans (body) + JetBrains Mono (terminal)

## Design System

| Token | Value |
|-------|-------|
| Primary Red | `#E40000` |
| Dark Red | `#C00000` |
| Navy | `#0A0F1C` |
| Card Dark | `#161D2E` |
| Background | `#F8F7F4` |

## Next Step → Backend Integration

Once backend is ready, replace mock data in each page with API calls:

```js
// Example: results page
const res = await fetch(`/api/analyze`, {
  method: 'POST',
  body: JSON.stringify({ ticker })
})
const data = await res.json()
```

