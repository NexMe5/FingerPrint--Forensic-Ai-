# FingerPrint Forensic AI — Testing & Workflow Guide

This guide provides a step-by-step workflow for testing the **FingerPrint Forensic AI** application. Follow these steps to verify the core forensic intelligence pipeline and data integrity.

---

## 🚀 Phase 1: Environment & Launch

### 1. Verification of Backend Dependencies
Ensure the following environment variables and packages are active:
- `NEXTTOKEN_API_KEY`: Required for Linguistic Analysis via Gemini LLM.
- **Dependencies**: `pandas`, `numpy`, `nexttoken` (Standard standard library for SQLite).

### 2. Launch the Application
1. In the **Apps** tab of your environment, ensure the app is running.
2. If the app is not visible, run the launch command:
   ```python
   launch_app(app_name="fingerprint", app_path="apps/fingerprint/frontend/dist/index.html")
   ```
3. Open the **Apps tab** to interact with the UI.

---

## 🔍 Phase 2: Live Forensic Scanner Workflow

### Step 1: Initialize a Scan
- **Action**: Navigate to the **Live Scanner** in the sidebar.
- **Input**: Enter a stock ticker (e.g., `AAPL`, `TSLA`, or `NVDA`) in the search field.
- **Action**: Click the **"Run Forensic Scan"** button.

### Step 2: Monitor the Neural Processing Stream
- **Observation**: You should see a real-time progress bar and "Neural Processing" status updates:
  - `[10%] Fetching SEC filings and transcripts...`
  - `[30%] Running Quantitative Forensics...`
  - `[60%] Analyzing Linguistic Patterns...`
  - `[80%] Running Consistency Cross-Reference...`
- **Verification**: Ensure the stream does not hang and reaches 100%.

### Step 3: Analyze the Results Dashboard
Once complete, verify the following data sections appear:
- **Manipulation Risk Score**: A circular gauge showing 0-100 score.
- **Quantitative Pillars**: Check Beneish M-Score and Altman Z-Score cards.
- **Linguistic Red Flags**: Verify the LLM-generated summary and deceptive behavior probability.
- **Consistency Engine**: Review the alignment score between CEO claims and legal filings.
- **Forensic Pillar Radar**: Verify the multi-axis radar chart displays the balance of risk.

---

## 📂 Phase 3: Archive & Benchmarking

### Step 4: Verify Forensic Archive
- **Action**: Click on **"Forensic Archive"** in the sidebar.
- **Verification**: Your recent scan (e.g., `TSLA`) should appear at the top of the table.
- **Data Check**: Confirm the risk score and timestamp are correctly persisted.

### Step 5: benchmark against Landmarks
- **Action**: Click on **"Benchmarks"** in the sidebar.
- **Verification**: Review the 6 landmark cases (Enron, Wirecard, etc.).
- **Insight Check**: Each case should show the "Detection Lead Time" and a brief summary of the forensic signature.

---

## 🛠 Phase 4: Technical Troubleshooting

### Log Monitoring
If an analysis fails or results don't appear:
1. Open the **Jobs** tab or check the `apps/fingerprint/logs/` directory.
2. **Backend Logs (`backend.log`)**: Look for `[BACKEND_ERROR]`. 
   - *Common issue*: `401 Unauthorized` (check NEXTTOKEN_API_KEY).
3. **Frontend Logs (`frontend.log`)**: Look for `[STREAM_ERROR]` or `[FETCH_ERROR]`.

### Database Integrity
To manually verify data storage in the terminal:
```bash
sqlite3 apps/fingerprint/backend/data/db/forensic.db "SELECT ticker, risk_score FROM analyses ORDER BY created_at DESC LIMIT 5;"
```

---

**Testing Lead**: NextToken AI  
**Version**: 1.0.0 (Forensic Intelligence MVP)
