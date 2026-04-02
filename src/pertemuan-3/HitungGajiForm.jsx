/**
 * NexoX - Crypto & Stock Exchange Platform
 * Transformed from: HitungGajiForm.jsx
 *
 * Dependencies:
 *   npm install recharts
 *
 * Usage:
 *   import HitungGajiForm from './HitungGajiForm';
 *   <HitungGajiForm />
 */

import { useState, useEffect, useRef, useCallback } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

/* ─── Data & Helpers ──────────────────────────────────────────────── */

const ASSETS = {
  BTC:  { name: "Bitcoin",      cat: "Crypto",    base: 95000, vol: 0.025, color: "#f7931a" },
  ETH:  { name: "Ethereum",     cat: "Crypto",    base: 3200,  vol: 0.030, color: "#627eea" },
  BNB:  { name: "BNB",          cat: "Crypto",    base: 580,   vol: 0.028, color: "#f0b90b" },
  SOL:  { name: "Solana",       cat: "Crypto",    base: 175,   vol: 0.035, color: "#9945ff" },
  AAPL: { name: "Apple Inc.",   cat: "Stock",     base: 218,   vol: 0.012, color: "#aaaaaa" },
  TSLA: { name: "Tesla Inc.",   cat: "Stock",     base: 265,   vol: 0.040, color: "#e82127" },
  NVDA: { name: "NVIDIA Corp.", cat: "Stock",     base: 875,   vol: 0.033, color: "#76b900" },
  GOLD: { name: "Gold Spot",    cat: "Commodity", base: 3350,  vol: 0.008, color: "#d4af37" },
};

function genHistory(base, vol, n = 60) {
  let arr = [], p = base * (0.85 + Math.random() * 0.1);
  for (let i = 0; i < n; i++) {
    p = Math.max(p + (Math.random() - 0.48) * vol * p, 1);
    arr.push(parseFloat(p.toFixed(p < 10 ? 4 : p < 1000 ? 2 : 0)));
  }
  return arr;
}

function initPrices() {
  const obj = {};
  Object.keys(ASSETS).forEach((k) => {
    const h = genHistory(ASSETS[k].base, ASSETS[k].vol);
    obj[k] = { history: h, current: h[h.length - 1], prev: h[h.length - 2] };
  });
  return obj;
}

function fmtPrice(p) {
  if (p >= 1000) return "$" + p.toLocaleString("en", { maximumFractionDigits: 0 });
  if (p >= 1)    return "$" + p.toFixed(2);
  return "$" + p.toFixed(4);
}

function fmtUSD(v) {
  return "$" + parseFloat(v).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function pctChg(history) {
  if (history.length < 2) return 0;
  return ((history[history.length - 1] - history[0]) / history[0]) * 100;
}

function genLabels(n) {
  const now = new Date(), labels = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 60 * 60000);
    labels.push(d.getHours().toString().padStart(2, "0") + ":00");
  }
  return labels;
}

/* ─── Styles ──────────────────────────────────────────────────────── */

const css = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap');
.nxo-root *, .nxo-root *::before, .nxo-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.nxo-root {
  font-family: 'Inter', sans-serif;
  background: #0b0e14;
  color: #e2e8f0;
  font-size: 13px;
  min-height: 100vh;
}
.nxo-topbar {
  background: #0f1320;
  border-bottom: 1px solid #1e2535;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}
.nxo-logo { font-size: 16px; font-weight: 600; color: #fff; letter-spacing: -0.5px; }
.nxo-logo span { color: #f7931a; }
.nxo-ticker { display: flex; gap: 20px; flex-wrap: wrap; }
.nxo-ticker-item { display: flex; align-items: center; gap: 6px; font-size: 11px; white-space: nowrap; }
.nxo-ticker-sym { color: #8b9ab0; font-weight: 500; }
.nxo-ticker-price { font-family: 'JetBrains Mono', monospace; }
.nxo-up { color: #10b981; } .nxo-dn { color: #ef4444; }
.nxo-up-bg { background: rgba(16,185,129,.15); color: #10b981; }
.nxo-dn-bg { background: rgba(239,68,68,.15); color: #ef4444; }
.nxo-badge { font-size: 10px; padding: 1px 5px; border-radius: 3px; }
.nxo-layout { display: grid; grid-template-columns: 200px 1fr 280px; min-height: calc(100vh - 45px); }
.nxo-panel { background: #0b0e14; border-right: 1px solid #1e2535; padding: 12px 10px; overflow-y: auto; }
.nxo-center { background: #0b0e14; border-right: 1px solid #1e2535; }
.nxo-right { background: #0b0e14; padding: 16px; overflow-y: auto; }
.nxo-sec-title { font-size: 10px; color: #8b9ab0; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 10px; font-weight: 600; }
.nxo-asset-item {
  padding: 10px 8px; border-radius: 6px; cursor: pointer;
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 2px; transition: background .15s;
}
.nxo-asset-item:hover { background: #131926; }
.nxo-asset-item.active { background: #131926; border-left: 2px solid #f7931a; padding-left: 6px; }
.nxo-asset-sym { font-weight: 600; font-size: 12px; }
.nxo-asset-cat { font-size: 10px; color: #8b9ab0; margin-top: 1px; }
.nxo-asset-price { font-family: 'JetBrains Mono', monospace; font-size: 11px; text-align: right; }
.nxo-asset-chg { font-size: 10px; text-align: right; }
.nxo-chart-header { padding: 16px 20px 0; display: flex; align-items: flex-start; justify-content: space-between; }
.nxo-chart-title { font-size: 20px; font-weight: 600; font-family: 'JetBrains Mono', monospace; }
.nxo-chart-badge { font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 600; margin-left: 10px; }
.nxo-chart-sub { font-size: 11px; color: #8b9ab0; margin-top: 2px; }
.nxo-tf-btns { display: flex; gap: 4px; }
.nxo-tf-btn {
  padding: 3px 10px; border-radius: 4px; border: 1px solid #1e2535;
  background: transparent; color: #8b9ab0; font-size: 11px; cursor: pointer;
  transition: all .15s; font-family: 'Inter', sans-serif;
}
.nxo-tf-btn.active, .nxo-tf-btn:hover { background: #1e2535; color: #fff; border-color: #2d3748; }
.nxo-chart-meta { display: flex; gap: 20px; padding: 12px 20px 0; flex-wrap: wrap; }
.nxo-meta-lbl { font-size: 10px; color: #8b9ab0; text-transform: uppercase; letter-spacing: .05em; }
.nxo-meta-val { font-family: 'JetBrains Mono', monospace; font-size: 12px; margin-top: 2px; }
.nxo-divider { height: 1px; background: #1e2535; margin: 14px 0; }
.nxo-buy-sell { display: flex; margin-bottom: 16px; border-radius: 6px; overflow: hidden; border: 1px solid #1e2535; }
.nxo-bs-tab { flex: 1; padding: 8px; text-align: center; cursor: pointer; font-size: 12px; font-weight: 600; transition: background .15s; color: #8b9ab0; }
.nxo-bs-tab.buy.active  { background: rgba(16,185,129,.15); color: #10b981; }
.nxo-bs-tab.sell.active { background: rgba(239,68,68,.15); color: #ef4444; }
.nxo-form-group { margin-bottom: 12px; }
.nxo-form-label { font-size: 10px; color: #8b9ab0; text-transform: uppercase; letter-spacing: .05em; margin-bottom: 5px; }
.nxo-input-wrap { position: relative; }
.nxo-form-input {
  width: 100%; background: #131926; border: 1px solid #1e2535;
  border-radius: 6px; padding: 8px 44px 8px 10px; color: #e2e8f0;
  font-size: 13px; font-family: 'JetBrains Mono', monospace;
  transition: border .15s; outline: none;
}
.nxo-form-input:focus { border-color: #2d4a7a; }
.nxo-input-tag { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 11px; color: #8b9ab0; pointer-events: none; }
.nxo-pct-btns { display: flex; gap: 4px; margin-bottom: 12px; }
.nxo-pct-btn {
  flex: 1; padding: 4px; border-radius: 4px; border: 1px solid #1e2535;
  background: transparent; color: #8b9ab0; font-size: 10px; cursor: pointer;
  text-align: center; transition: all .15s;
}
.nxo-pct-btn:hover { background: #1e2535; color: #fff; }
.nxo-result-box { background: #131926; border-radius: 6px; padding: 10px; margin-bottom: 12px; }
.nxo-result-row { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 11px; }
.nxo-result-row:last-child { margin-bottom: 0; font-size: 12px; font-weight: 600; }
.nxo-result-label { color: #8b9ab0; }
.nxo-result-val { font-family: 'JetBrains Mono', monospace; }
.nxo-submit-btn {
  width: 100%; padding: 11px; border-radius: 6px; border: none;
  font-size: 13px; font-weight: 600; cursor: pointer;
  font-family: 'Inter', sans-serif; transition: all .2s; letter-spacing: .03em;
}
.nxo-submit-btn.buy  { background: #10b981; color: #fff; }
.nxo-submit-btn.buy:hover  { background: #059669; }
.nxo-submit-btn.sell { background: #ef4444; color: #fff; }
.nxo-submit-btn.sell:hover { background: #dc2626; }
.nxo-submit-btn:active { transform: scale(.98); }
.nxo-notif {
  border-radius: 6px; padding: 10px 12px; margin-bottom: 14px;
  font-size: 11px; display: flex; align-items: center; gap: 8px;
  border: 1px solid;
}
.nxo-notif.success { border-color: rgba(16,185,129,.3); color: #10b981; background: rgba(16,185,129,.07); }
.nxo-notif.error   { border-color: rgba(239,68,68,.3);  color: #ef4444; background: rgba(239,68,68,.07); }
.nxo-balance-row { display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 5px; }
.nxo-balance-val { font-family: 'JetBrains Mono', monospace; }
.nxo-order-row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid #1a2030; font-size: 11px; }
.nxo-order-side { padding: 2px 7px; border-radius: 3px; font-size: 10px; font-weight: 600; }
.nxo-market-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
.nxo-market-table th { font-size: 10px; color: #8b9ab0; text-transform: uppercase; letter-spacing: .05em; padding: 0 0 8px; text-align: left; font-weight: 500; }
.nxo-market-table th:not(:first-child), .nxo-market-table td:not(:first-child) { text-align: right; }
.nxo-market-table td { padding: 7px 0; border-bottom: 1px solid #131926; font-size: 11px; cursor: pointer; }
.nxo-market-table tr:last-child td { border: none; }
.nxo-mono { font-family: 'JetBrains Mono', monospace; }
@media (max-width: 900px) {
  .nxo-layout { grid-template-columns: 1fr; }
  .nxo-panel { max-height: 200px; }
}
`;

/* ─── Custom Tooltip ─────────────────────────────────────────────── */

const CustomTooltip = ({ active, payload, sym }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1e2535", border: "1px solid #2d3748", borderRadius: 6, padding: "6px 10px", fontSize: 11 }}>
      <span style={{ color: "#8b9ab0" }}>Price: </span>
      <span style={{ fontFamily: "monospace" }}>{fmtPrice(payload[0].value)}</span>
    </div>
  );
};

/* ─── Main Component (HitungGajiForm - original name kept) ────────── */

export default function HitungGajiForm() {
  const [prices, setPrices]       = useState(() => initPrices());
  const [selected, setSelected]   = useState("BTC");
  const [mode, setMode]           = useState("buy");
  const [amount, setAmount]       = useState("");
  const [usdt, setUsdt]           = useState(10000);
  const [holdings, setHoldings]   = useState({});
  const [orders, setOrders]       = useState([]);
  const [notif, setNotif]         = useState(null);
  const [tf, setTf]               = useState("1H");
  const notifTimer                = useRef(null);

  /* Live price simulation */
  useEffect(() => {
    const id = setInterval(() => {
      setPrices((prev) => {
        const next = {};
        Object.keys(ASSETS).forEach((k) => {
          const info = ASSETS[k], p = prev[k];
          const chg = (Math.random() - 0.48) * info.vol * 0.3 * p.current;
          const cur  = parseFloat(Math.max(p.current + chg, 1).toFixed(p.current < 10 ? 4 : p.current < 1000 ? 2 : 0));
          const hist = [...p.history.slice(1), cur];
          next[k] = { history: hist, current: cur, prev: p.current };
        });
        return next;
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  /* Notification helper */
  const showNotif = useCallback((msg, type) => {
    clearTimeout(notifTimer.current);
    setNotif({ msg, type });
    notifTimer.current = setTimeout(() => setNotif(null), 3500);
  }, []);

  /* Derived values */
  const info    = ASSETS[selected];
  const p       = prices[selected];
  const chg     = pctChg(p.history);
  const isUp    = chg >= 0;
  const amt     = parseFloat(amount) || 0;
  const qty     = amt / p.current;
  const fee     = amt * 0.001;
  const total   = amt + fee;
  const labels  = genLabels(p.history.length);
  const chartData = p.history.map((v, i) => ({ time: labels[i], price: v }));

  /* Trade execution (evolved from HitungGajiForm's calculateSalary logic) */
  function executeTrade() {
    if (amt <= 0) { showNotif("Masukkan jumlah yang valid", "error"); return; }
    if (mode === "buy") {
      if (total > usdt) { showNotif("Saldo USDT tidak cukup", "error"); return; }
      setUsdt((u) => u - total);
      setHoldings((h) => ({ ...h, [selected]: (h[selected] || 0) + qty }));
      showNotif(`Berhasil beli ${qty.toFixed(6)} ${selected} @ ${fmtPrice(p.current)}`, "success");
    } else {
      const held = holdings[selected] || 0;
      if (qty > held) { showNotif(`Aset ${selected} tidak cukup`, "error"); return; }
      setHoldings((h) => ({ ...h, [selected]: h[selected] - qty }));
      setUsdt((u) => u + amt - fee);
      showNotif(`Berhasil jual ${qty.toFixed(6)} ${selected} @ ${fmtPrice(p.current)}`, "success");
    }
    setOrders((o) => [{ sym: selected, side: mode.toUpperCase(), amount: amt, price: p.current }, ...o]);
    setAmount("");
  }

  function setPct(pct) {
    const bal = mode === "buy" ? usdt : (holdings[selected] || 0) * p.current;
    setAmount((bal * (pct / 100) * 0.999).toFixed(2));
  }

  /* ─── Render ─────────────────────────────────────────────────── */
  return (
    <>
      <style>{css}</style>
      <div className="nxo-root">

        {/* Top bar */}
        <div className="nxo-topbar">
          <div className="nxo-logo">HQ<span>XChange</span></div>
          <div className="nxo-ticker">
            {Object.entries(ASSETS).slice(0, 5).map(([sym]) => {
              const pp = prices[sym], c = pctChg(pp.history), up = c >= 0;
              return (
                <div className="nxo-ticker-item" key={sym}>
                  <span className="nxo-ticker-sym">{sym}</span>
                  <span className={`nxo-ticker-price ${up ? "nxo-up" : "nxo-dn"}`}>{fmtPrice(pp.current)}</span>
                  <span className={`nxo-badge ${up ? "nxo-up-bg" : "nxo-dn-bg"}`}>{up ? "+" : ""}{c.toFixed(2)}%</span>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 11, color: "#10b981", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
            Live
          </div>
        </div>

        <div className="nxo-layout">

          {/* Left: Asset List */}
          <div className="nxo-panel">
            <div className="nxo-sec-title" style={{ padding: "0 4px" }}>Markets</div>
            {Object.entries(ASSETS).map(([sym, ai]) => {
              const pp = prices[sym], c = pctChg(pp.history), up = c >= 0;
              return (
                <div key={sym} className={`nxo-asset-item ${sym === selected ? "active" : ""}`} onClick={() => setSelected(sym)}>
                  <div>
                    <div className="nxo-asset-sym" style={{ color: ai.color }}>{sym}</div>
                    <div className="nxo-asset-cat">{ai.cat}</div>
                  </div>
                  <div>
                    <div className="nxo-asset-price">{fmtPrice(pp.current)}</div>
                    <div className={`nxo-asset-chg ${up ? "nxo-up" : "nxo-dn"}`}>{up ? "+" : ""}{c.toFixed(2)}%</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center: Chart */}
          <div className="nxo-center">
            <div className="nxo-chart-header">
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="nxo-chart-title">{selected}/{info.cat === "Stock" ? "USD" : "USDT"}</span>
                  <span className={`nxo-chart-badge ${isUp ? "nxo-up-bg" : "nxo-dn-bg"}`}>
                    {isUp ? "▲ +" : "▼ "}{Math.abs(chg).toFixed(2)}%
                  </span>
                </div>
                <div className="nxo-chart-sub">{info.name} · {info.cat}</div>
              </div>
              <div className="nxo-tf-btns">
                {["1H", "4H", "1D", "1W"].map((t) => (
                  <button key={t} className={`nxo-tf-btn ${tf === t ? "active" : ""}`} onClick={() => setTf(t)}>{t}</button>
                ))}
              </div>
            </div>

            <div className="nxo-chart-meta">
              {[
                { lbl: "Current", val: fmtPrice(p.current), style: { color: info.color, fontSize: 15 } },
                { lbl: "24h High", val: fmtPrice(Math.max(...p.history)), style: { color: "#10b981" } },
                { lbl: "24h Low",  val: fmtPrice(Math.min(...p.history)), style: { color: "#ef4444" } },
                { lbl: "Volume",   val: (Math.random() * 9 + 1).toFixed(2) + "B", style: {} },
              ].map(({ lbl, val, style }) => (
                <div key={lbl}>
                  <div className="nxo-meta-lbl">{lbl}</div>
                  <div className="nxo-meta-val" style={style}>{val}</div>
                </div>
              ))}
            </div>

            <div style={{ padding: "10px 20px 0" }}>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor={isUp ? "#10b981" : "#ef4444"} stopOpacity={0.25} />
                      <stop offset="100%" stopColor={isUp ? "#10b981" : "#ef4444"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="time" tick={{ fill: "#8b9ab0", fontSize: 10 }} tickLine={false} interval="preserveStartEnd" />
                  <YAxis domain={["auto", "auto"]} tick={{ fill: "#8b9ab0", fontSize: 10 }} tickLine={false} tickFormatter={fmtPrice} orientation="right" width={75} />
                  <Tooltip content={<CustomTooltip sym={selected} />} />
                  <Area type="monotone" dataKey="price" stroke={isUp ? "#10b981" : "#ef4444"} strokeWidth={2} fill="url(#grad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div style={{ padding: "0 20px 16px", marginTop: 16 }}>
              <div className="nxo-sec-title">Market Overview</div>
              <table className="nxo-market-table">
                <thead>
                  <tr>
                    <th>Asset</th><th>Price</th><th>24h Change</th><th>Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(ASSETS).map(([sym, ai]) => {
                    const pp = prices[sym], c = pctChg(pp.history), up = c >= 0;
                    return (
                      <tr key={sym} onClick={() => setSelected(sym)}>
                        <td><span style={{ color: ai.color, fontWeight: 600 }}>{sym}</span> <span style={{ color: "#8b9ab0" }}>{ai.name}</span></td>
                        <td className="nxo-mono">{fmtPrice(pp.current)}</td>
                        <td className={up ? "nxo-up" : "nxo-dn"}>{up ? "+" : ""}{c.toFixed(2)}%</td>
                        <td className="nxo-mono" style={{ color: "#8b9ab0" }}>{(Math.random() * 9 + 1).toFixed(2)}B</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Trade Panel (evolved from HitungGajiForm) */}
          <div className="nxo-right">
            {notif && (
              <div className={`nxo-notif ${notif.type}`}>
                {notif.type === "success" ? "✓" : "✕"} {notif.msg}
              </div>
            )}

            <div className="nxo-sec-title">Trade</div>
            <div className="nxo-buy-sell">
              <div className={`nxo-bs-tab buy ${mode === "buy" ? "active" : ""}`} onClick={() => setMode("buy")}>Buy</div>
              <div className={`nxo-bs-tab sell ${mode === "sell" ? "active" : ""}`} onClick={() => setMode("sell")}>Sell</div>
            </div>

            <div className="nxo-form-group">
              <div className="nxo-form-label">Amount (USDT)</div>
              <div className="nxo-input-wrap">
                <input
                  type="number"
                  className="nxo-form-input"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <span className="nxo-input-tag">USDT</span>
              </div>
            </div>

            <div className="nxo-pct-btns">
              {[25, 50, 75, 100].map((pct) => (
                <button key={pct} className="nxo-pct-btn" onClick={() => setPct(pct)}>
                  {pct === 100 ? "Max" : `${pct}%`}
                </button>
              ))}
            </div>

            {/* Result box — equivalent of original totalGaji display */}
            <div className="nxo-result-box">
              <div className="nxo-result-row">
                <span className="nxo-result-label">Harga Saat Ini</span>
                <span className="nxo-result-val">{fmtPrice(p.current)}</span>
              </div>
              <div className="nxo-result-row">
                <span className="nxo-result-label">Qty Aset</span>
                <span className="nxo-result-val">{amt > 0 ? `${qty.toFixed(6)} ${selected}` : "-"}</span>
              </div>
              <div className="nxo-result-row">
                <span className="nxo-result-label">Fee (0.1%)</span>
                <span className="nxo-result-val">{amt > 0 ? fmtUSD(fee) : "-"}</span>
              </div>
              <div className="nxo-result-row">
                <span className="nxo-result-label">Total</span>
                <span className="nxo-result-val" style={{ color: "#f7931a" }}>{amt > 0 ? fmtUSD(total) : "-"}</span>
              </div>
            </div>

            <button className={`nxo-submit-btn ${mode}`} onClick={executeTrade}>
              {mode === "buy" ? "Buy" : "Sell"} {selected}
            </button>

            <div className="nxo-divider" />

            <div className="nxo-sec-title">Balance</div>
            <div className="nxo-balance-row">
              <span style={{ color: "#8b9ab0" }}>USDT</span>
              <span className="nxo-balance-val">{usdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
            </div>
            {Object.entries(holdings).map(([sym, q]) =>
              q > 0.000001 ? (
                <div className="nxo-balance-row" key={sym}>
                  <span style={{ color: "#8b9ab0" }}>{sym}</span>
                  <span className="nxo-balance-val">
                    {q.toFixed(6)}{" "}
                    <span style={{ color: "#8b9ab0", fontSize: 10 }}>({fmtUSD(q * prices[sym].current)})</span>
                  </span>
                </div>
              ) : null
            )}

            <div className="nxo-divider" />

            <div className="nxo-sec-title">Order History</div>
            {orders.length === 0 ? (
              <div style={{ fontSize: 11, color: "#8b9ab0", textAlign: "center", padding: "10px 0" }}>Belum ada order</div>
            ) : (
              orders.slice(0, 6).map((o, i) => (
                <div className="nxo-order-row" key={i}>
                  <span className={`nxo-order-side ${o.side === "BUY" ? "nxo-up-bg" : "nxo-dn-bg"}`}>{o.side}</span>
                  <span style={{ fontWeight: 500 }}>{o.sym}</span>
                  <span className="nxo-mono" style={{ color: "#8b9ab0" }}>{fmtUSD(o.amount)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}