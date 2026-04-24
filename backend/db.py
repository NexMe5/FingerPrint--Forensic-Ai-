import sqlite3
import os

DB_DIR = "apps/fingerprint/backend/data/db"
DB_PATH = os.path.join(DB_DIR, "forensic.db")

def _get_db():
    """Open a connection with recommended settings."""
    os.makedirs(DB_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    return conn

def init_db():
    """Initialize the database schema."""
    conn = _get_db()
    try:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS analyses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ticker TEXT NOT NULL,
                risk_score REAL,
                quantitative TEXT,
                linguistic TEXT,
                market_intelligence TEXT,
                fact_check TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS market_pulse (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ticker TEXT NOT NULL,
                title TEXT,
                url TEXT,
                snippet TEXT,
                category TEXT, -- 'Big News', 'Incident', 'P&L'
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS backtests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                company TEXT NOT NULL,
                year INTEGER,
                score REAL,
                lead_time TEXT,
                summary TEXT
            )
        """)
        
        # Seed backtests if empty
        count = conn.execute("SELECT COUNT(*) FROM backtests").fetchone()[0]
        if count == 0:
            seed_data = [
                ("Enron", 2001, 98.5, "6 months", "Detected massive off-balance sheet liabilities and revenue inflation."),
                ("WorldCom", 2002, 94.2, "4 months", "Identified capitalization of ordinary expenses."),
                ("Wirecard", 2020, 99.1, "12 months", "Flagged non-existent cash balances in third-party acquirers."),
                ("Lehman Brothers", 2008, 88.7, "3 months", "Repo 105 transactions flagged as consistency violations."),
                ("Theranos", 2015, 96.4, "9 months", "Linguistic analysis of founder claims showed high deception probability.")
            ]
            conn.executemany("INSERT INTO backtests (company, year, score, lead_time, summary) VALUES (?, ?, ?, ?, ?)", seed_data)
        
        conn.commit()
    finally:
        conn.close()

def save_analysis(ticker, risk_score, quant, ling, market_intel, fact_check):
    conn = _get_db()
    try:
        import json
        conn.execute("""
            INSERT INTO analyses (ticker, risk_score, quantitative, linguistic, market_intelligence, fact_check)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (ticker, risk_score, json.dumps(quant), json.dumps(ling), json.dumps(market_intel), json.dumps(fact_check)))
        conn.commit()
    finally:
        conn.close()

def save_market_pulse(ticker, items):
    conn = _get_db()
    try:
        # Clear old items for this ticker to keep pulse fresh
        conn.execute("DELETE FROM market_pulse WHERE ticker = ?", (ticker,))
        for item in items:
            conn.execute("""
                INSERT INTO market_pulse (ticker, title, url, snippet, category)
                VALUES (?, ?, ?, ?, ?)
            """, (ticker, item.get("title"), item.get("url"), item.get("snippet"), item.get("category")))
        conn.commit()
    finally:
        conn.close()

def get_market_pulse_db(ticker):
    conn = _get_db()
    try:
        rows = conn.execute("SELECT * FROM market_pulse WHERE ticker = ? ORDER BY created_at DESC", (ticker,)).fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()

def get_history(limit=50):
    conn = _get_db()
    try:
        rows = conn.execute("SELECT * FROM analyses ORDER BY created_at DESC LIMIT ?", (limit,)).fetchall()
        import json
        result = []
        for r in rows:
            d = dict(r)
            d["quantitative"] = json.loads(d["quantitative"]) if d.get("quantitative") else {}
            d["linguistic"] = json.loads(d["linguistic"]) if d.get("linguistic") else {}
            d["market_intelligence"] = json.loads(d["market_intelligence"]) if d.get("market_intelligence") else {}
            d["fact_check"] = json.loads(d["fact_check"]) if d.get("fact_check") else {}
            result.append(d)
        return result
    finally:
        conn.close()

def get_backtests():
    conn = _get_db()
    try:
        rows = conn.execute("SELECT * FROM backtests ORDER BY score DESC").fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()
