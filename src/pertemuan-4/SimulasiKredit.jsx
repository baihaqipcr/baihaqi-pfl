/**
 * SimulasiKredit.jsx
 * Form simulasi pengajuan kredit dengan:
 *  - 3 input + 2 select dropdown
 *  - 3+ validasi per field (dengan pesan error inline)
 *  - Tombol submit hanya muncul saat semua field valid
 *  - Hasil perhitungan ditampilkan di bawah form
 *  - State, reusable component, conditional rendering
 *
 * No external dependencies needed (pure React + CSS-in-JS)
 */

import { useState, useCallback } from "react";

/* ─── CSS ─────────────────────────────────────────────────────────────── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');

:root {
  --bg:       #0d1117;
  --surface:  #161b27;
  --border:   #252d3d;
  --border-focus: #c9a84c;
  --text:     #e8e3da;
  --muted:    #6b7591;
  --gold:     #c9a84c;
  --gold-dim: rgba(201,168,76,0.12);
  --red:      #e05c5c;
  --red-dim:  rgba(224,92,92,0.1);
  --green:    #4caf7d;
  --green-dim:rgba(76,175,125,0.1);
  --radius:   10px;
}

.sk-wrap {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1.25rem 4rem;
}

.sk-header {
  text-align: center;
  margin-bottom: 2.5rem;
  max-width: 520px;
}
.sk-eyebrow {
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.75rem;
}
.sk-title {
  font-family: 'Fraunces', serif;
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 300;
  line-height: 1.15;
  color: var(--text);
  margin-bottom: 0.75rem;
}
.sk-title em { font-style: italic; color: var(--gold); }
.sk-desc {
  font-size: 0.875rem;
  color: var(--muted);
  line-height: 1.7;
}

.sk-card {
  width: 100%;
  max-width: 560px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2.25rem;
}

/* Progress steps */
.sk-steps {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 0;
}
.sk-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
}
.sk-step-circle {
  width: 28px; height: 28px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 500; color: var(--muted);
  background: var(--surface);
  position: relative; z-index: 1;
  transition: all 0.3s;
}
.sk-step.done .sk-step-circle  { border-color: var(--gold); background: var(--gold); color: #0d1117; }
.sk-step.active .sk-step-circle{ border-color: var(--gold); color: var(--gold); }
.sk-step-label { font-size: 10px; color: var(--muted); margin-top: 5px; white-space: nowrap; }
.sk-step.done .sk-step-label, .sk-step.active .sk-step-label { color: var(--gold); }
.sk-step-line {
  flex: 1; height: 1px; background: var(--border);
  margin-bottom: 18px;
  transition: background 0.3s;
}
.sk-step-line.done { background: var(--gold); }

/* Section label */
.sk-section-label {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 1.25rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--border);
}

/* Field */
.sk-field { margin-bottom: 1.25rem; }
.sk-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 0.4rem;
  letter-spacing: 0.02em;
}
.sk-label-required { color: var(--gold); font-size: 11px; }
.sk-input-wrap { position: relative; }
.sk-input, .sk-select {
  width: 100%;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
  color: var(--text);
  font-size: 0.9rem;
  font-family: 'DM Sans', sans-serif;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
  appearance: none;
}
.sk-input:focus, .sk-select:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px var(--gold-dim);
}
.sk-input.has-error, .sk-select.has-error {
  border-color: var(--red);
  box-shadow: 0 0 0 3px var(--red-dim);
}
.sk-input.is-valid, .sk-select.is-valid {
  border-color: var(--green);
}
.sk-select-arrow {
  position: absolute; right: 12px; top: 50%;
  transform: translateY(-50%); pointer-events: none;
  color: var(--muted); font-size: 12px;
}
.sk-prefix {
  position: absolute; left: 12px; top: 50%;
  transform: translateY(-50%);
  color: var(--muted); font-size: 13px; font-weight: 500;
  pointer-events: none;
}
.sk-input.has-prefix { padding-left: 2.75rem; }

/* Error & hint */
.sk-errors { margin-top: 0.4rem; display: flex; flex-direction: column; gap: 3px; }
.sk-error-item {
  display: flex; align-items: flex-start; gap: 5px;
  font-size: 11px; color: var(--red);
  animation: slideIn 0.2s ease;
}
.sk-error-dot {
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--red-dim); border: 1px solid var(--red);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px; font-size: 9px;
}
.sk-valid-msg {
  font-size: 11px; color: var(--green);
  display: flex; align-items: center; gap: 5px;
  margin-top: 4px; animation: slideIn 0.2s ease;
}
.sk-hint { font-size: 11px; color: var(--muted); margin-top: 4px; }

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Divider */
.sk-divider { height: 1px; background: var(--border); margin: 1.5rem 0; }

/* Submit button */
.sk-btn-wrap { margin-top: 1.75rem; }
.sk-submit {
  width: 100%; padding: 0.9rem;
  background: var(--gold);
  color: #0d1117;
  border: none; border-radius: var(--radius);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem; font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.2s;
}
.sk-submit:hover { background: #e0bc5a; transform: translateY(-1px); }
.sk-submit:active { transform: scale(0.98); }

.sk-locked {
  width: 100%; padding: 0.9rem;
  background: transparent;
  color: var(--muted);
  border: 1px dashed var(--border);
  border-radius: var(--radius);
  font-size: 0.85rem;
  text-align: center;
  cursor: not-allowed;
  margin-top: 1.75rem;
}

/* Progress bar */
.sk-progress-wrap { margin-bottom: 1.5rem; }
.sk-progress-label { display: flex; justify-content: space-between; font-size: 11px; color: var(--muted); margin-bottom: 6px; }
.sk-progress-bar { height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; }
.sk-progress-fill { height: 100%; background: var(--gold); border-radius: 2px; transition: width 0.4s cubic-bezier(.22,1,.36,1); }

/* Results */
.sk-results {
  width: 100%; max-width: 560px;
  margin-top: 1.5rem;
  animation: fadeUp 0.5s ease;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.sk-results-header {
  display: flex; align-items: center; gap: 12px;
  background: var(--green-dim);
  border: 1px solid rgba(76,175,125,0.3);
  border-radius: 10px;
  padding: 1rem 1.25rem;
  margin-bottom: 1.25rem;
}
.sk-results-icon {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(76,175,125,0.2);
  display: flex; align-items: center; justify-content: center;
  color: var(--green); font-size: 16px; flex-shrink: 0;
}
.sk-results-title { font-size: 13px; font-weight: 500; color: var(--green); }
.sk-results-sub { font-size: 11px; color: var(--muted); margin-top: 2px; }

.sk-results-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}
.sk-results-profile {
  padding: 1.25rem;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; gap: 14px;
}
.sk-profile-avatar {
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--gold-dim);
  border: 1.5px solid var(--gold);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Fraunces', serif;
  font-size: 18px; color: var(--gold); font-weight: 300;
  flex-shrink: 0;
}
.sk-profile-name { font-weight: 500; font-size: 14px; }
.sk-profile-meta { font-size: 11px; color: var(--muted); margin-top: 2px; }
.sk-profile-badge {
  margin-left: auto; padding: 4px 12px;
  background: var(--gold-dim); border: 1px solid var(--gold);
  border-radius: 100px; font-size: 10px; color: var(--gold);
  letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap;
}

.sk-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); }
.sk-metric {
  background: var(--surface); padding: 1.1rem 1.25rem;
}
.sk-metric-label { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
.sk-metric-value { font-family: 'Fraunces', serif; font-size: 1.35rem; font-weight: 300; color: var(--text); }
.sk-metric-value.gold { color: var(--gold); }
.sk-metric-value.red  { color: var(--red); }
.sk-metric-sub { font-size: 10px; color: var(--muted); margin-top: 3px; }

.sk-breakdown {
  padding: 1.25rem;
  border-top: 1px solid var(--border);
}
.sk-breakdown-title { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.9rem; }
.sk-breakdown-row {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 12px; padding: 6px 0;
  border-bottom: 1px solid rgba(37,45,61,0.6);
}
.sk-breakdown-row:last-child { border: none; font-weight: 500; font-size: 13px; }
.sk-breakdown-key { color: var(--muted); }
.sk-breakdown-val { font-family: 'DM Sans', monospace; }

.sk-ratio-bar {
  margin: 1rem 1.25rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
}
.sk-ratio-header { display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 8px; }
.sk-ratio-label { color: var(--muted); }
.sk-ratio-pct { font-weight: 500; }
.sk-ratio-track { height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; }
.sk-ratio-fill { height: 100%; border-radius: 3px; transition: width 0.6s ease; }

.sk-reset {
  width: 100%; margin-top: 1rem;
  padding: 0.75rem; background: transparent;
  border: 1px solid var(--border); border-radius: var(--radius);
  color: var(--muted); font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem; cursor: pointer; transition: all 0.2s;
}
.sk-reset:hover { border-color: var(--gold); color: var(--gold); }

@media (max-width: 500px) {
  .sk-metrics { grid-template-columns: 1fr; }
  .sk-card { padding: 1.5rem; }
}
`;

/* ─── Validation Rules ─────────────────────────────────────────────────── */

const VALIDATIONS = {
  namaLengkap: (val) => {
    const errs = [];
    if (!val.trim())                          errs.push("Nama lengkap wajib diisi");
    if (val.trim().length > 0 && val.trim().length < 3) errs.push("Nama minimal 3 karakter");
    if (/\d/.test(val))                       errs.push("Nama tidak boleh mengandung angka");
    if (/[^a-zA-Z\s.'-]/.test(val) && val)   errs.push("Hanya huruf, spasi, titik, dan tanda hubung");
    if (val.trim().length > 50)               errs.push("Nama maksimal 50 karakter");
    return errs;
  },
  penghasilan: (val) => {
    const errs = [];
    if (!val.trim())                          errs.push("Penghasilan bulanan wajib diisi");
    if (val && isNaN(Number(val)))            errs.push("Harus berupa angka");
    if (val && Number(val) <= 0)              errs.push("Penghasilan harus lebih dari 0");
    if (val && Number(val) < 1_000_000)      errs.push("Penghasilan minimum Rp 1.000.000");
    if (val && Number(val) > 500_000_000)    errs.push("Penghasilan maksimum Rp 500.000.000");
    return errs;
  },
  jumlahPinjaman: (val, ctx) => {
    const errs = [];
    if (!val.trim())                          errs.push("Jumlah pinjaman wajib diisi");
    if (val && isNaN(Number(val)))            errs.push("Harus berupa angka");
    if (val && Number(val) < 5_000_000)      errs.push("Pinjaman minimum Rp 5.000.000");
    if (val && Number(val) > 2_000_000_000)  errs.push("Pinjaman maksimum Rp 2 Miliar");
    if (val && ctx.penghasilan && !isNaN(Number(ctx.penghasilan))) {
      const maxPinjaman = Number(ctx.penghasilan) * 10;
      if (Number(val) > maxPinjaman) errs.push(`Pinjaman maks 10× penghasilan (Rp ${fmtIDR(maxPinjaman)})`);
    }
    return errs;
  },
  tenor: (val) => {
    const errs = [];
    if (!val) errs.push("Tenor wajib dipilih");
    return errs;
  },
  tujuan: (val) => {
    const errs = [];
    if (!val) errs.push("Tujuan pinjaman wajib dipilih");
    return errs;
  },
};

/* ─── Helpers ─────────────────────────────────────────────────────────── */

function fmtIDR(n) {
  return Number(n).toLocaleString("id-ID");
}
function fmtCurrency(n) {
  return "Rp " + fmtIDR(n);
}
function calcKredit(pokok, bungaTahunan, tenorBulan) {
  const r = bungaTahunan / 12;
  const cicilan = (pokok * r * Math.pow(1 + r, tenorBulan)) / (Math.pow(1 + r, tenorBulan) - 1);
  const totalBayar = cicilan * tenorBulan;
  const totalBunga = totalBayar - pokok;
  return { cicilan: Math.round(cicilan), totalBayar: Math.round(totalBayar), totalBunga: Math.round(totalBunga) };
}

const BUNGA_RATES = {
  "6": 0.08, "12": 0.09, "24": 0.105, "36": 0.115, "48": 0.12, "60": 0.125,
};
const TUJUAN_LABELS = {
  "rumah":       "Pembelian Rumah",
  "kendaraan":   "Kendaraan Bermotor",
  "pendidikan":  "Biaya Pendidikan",
  "modal_usaha": "Modal Usaha",
  "renovasi":    "Renovasi Rumah",
  "lainnya":     "Keperluan Lainnya",
};

/* ─── Reusable: InputField ─────────────────────────────────────────────── */

function InputField({ label, name, type = "text", value, onChange, onBlur, errors, touched, placeholder, prefix, hint, required = true }) {
  const hasErrors = touched && errors.length > 0;
  const isValid   = touched && errors.length === 0 && value.trim() !== "";
  return (
    <div className="sk-field">
      <label className="sk-label">
        <span>{label}</span>
        {required && <span className="sk-label-required">wajib</span>}
      </label>
      <div className="sk-input-wrap">
        {prefix && <span className="sk-prefix">{prefix}</span>}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`sk-input${prefix ? " has-prefix" : ""}${hasErrors ? " has-error" : ""}${isValid ? " is-valid" : ""}`}
          autoComplete="off"
        />
      </div>
      {hint && !hasErrors && !isValid && <div className="sk-hint">{hint}</div>}
      {hasErrors && (
        <div className="sk-errors">
          {errors.map((e, i) => (
            <div className="sk-error-item" key={i}>
              <span className="sk-error-dot">✕</span>
              <span>{e}</span>
            </div>
          ))}
        </div>
      )}
      {isValid && <div className="sk-valid-msg"><span style={{ color: "var(--green)" }}>✓</span> Terisi dengan benar</div>}
    </div>
  );
}

/* ─── Reusable: SelectField ────────────────────────────────────────────── */

function SelectField({ label, name, value, onChange, onBlur, errors, touched, options, placeholder, required = true }) {
  const hasErrors = touched && errors.length > 0;
  const isValid   = touched && errors.length === 0 && value !== "";
  return (
    <div className="sk-field">
      <label className="sk-label">
        <span>{label}</span>
        {required && <span className="sk-label-required">wajib</span>}
      </label>
      <div className="sk-input-wrap">
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`sk-select${hasErrors ? " has-error" : ""}${isValid ? " is-valid" : ""}`}
        >
          <option value="">{placeholder || "— Pilih —"}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="sk-select-arrow">▾</span>
      </div>
      {hasErrors && (
        <div className="sk-errors">
          {errors.map((e, i) => (
            <div className="sk-error-item" key={i}>
              <span className="sk-error-dot">✕</span>
              <span>{e}</span>
            </div>
          ))}
        </div>
      )}
      {isValid && <div className="sk-valid-msg"><span style={{ color: "var(--green)" }}>✓</span> Dipilih</div>}
    </div>
  );
}

/* ─── Reusable: ResultMetric ───────────────────────────────────────────── */

function ResultMetric({ label, value, sub, variant }) {
  return (
    <div className="sk-metric">
      <div className="sk-metric-label">{label}</div>
      <div className={`sk-metric-value ${variant || ""}`}>{value}</div>
      {sub && <div className="sk-metric-sub">{sub}</div>}
    </div>
  );
}

/* ─── Reusable: Steps ──────────────────────────────────────────────────── */

function Steps({ filled }) {
  const steps = ["Data Diri", "Keuangan", "Pinjaman"];
  return (
    <div className="sk-steps">
      {steps.map((s, i) => {
        const isDone   = filled > i;
        const isActive = filled === i;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div className={`sk-step ${isDone ? "done" : isActive ? "active" : ""}`} style={{ flex: "0 0 auto" }}>
              <div className="sk-step-circle">{isDone ? "✓" : i + 1}</div>
              <div className="sk-step-label">{s}</div>
            </div>
            {i < steps.length - 1 && <div className={`sk-step-line ${isDone ? "done" : ""}`} />}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────────────── */

const INITIAL_FIELDS = { namaLengkap: "", penghasilan: "", jumlahPinjaman: "", tenor: "", tujuan: "" };
const INITIAL_TOUCHED = { namaLengkap: false, penghasilan: false, jumlahPinjaman: false, tenor: false, tujuan: false };

export default function SimulasiKredit() {
  const [fields,   setFields]   = useState(INITIAL_FIELDS);
  const [touched,  setTouched]  = useState(INITIAL_TOUCHED);
  const [submitted, setSubmitted] = useState(false);
  const [result,   setResult]   = useState(null);

  /* Compute all errors from current fields state */
  const errors = {
    namaLengkap:   VALIDATIONS.namaLengkap(fields.namaLengkap),
    penghasilan:   VALIDATIONS.penghasilan(fields.penghasilan),
    jumlahPinjaman:VALIDATIONS.jumlahPinjaman(fields.jumlahPinjaman, { penghasilan: fields.penghasilan }),
    tenor:         VALIDATIONS.tenor(fields.tenor),
    tujuan:        VALIDATIONS.tujuan(fields.tujuan),
  };

  const allValid = Object.values(errors).every((e) => e.length === 0)
    && Object.values(fields).every((v) => v.toString().trim() !== "");

  /* Count filled (valid) fields for progress */
  const filledCount = [
    errors.namaLengkap.length === 0 && fields.namaLengkap.trim(),
    errors.penghasilan.length === 0 && fields.penghasilan.trim(),
    errors.jumlahPinjaman.length === 0 && fields.jumlahPinjaman.trim(),
    errors.tenor.length === 0 && fields.tenor,
    errors.tujuan.length === 0 && fields.tujuan,
  ].filter(Boolean).length;

  const progressPct = Math.round((filledCount / 5) * 100);

  /* Step indicator: 0 = Data Diri, 1 = Keuangan, 2 = Pinjaman */
  const stepFilled = [
    errors.namaLengkap.length === 0 && fields.namaLengkap.trim() ? 1 : 0,
    (errors.penghasilan.length === 0 && fields.penghasilan.trim()) && (errors.tujuan.length === 0 && fields.tujuan) ? 1 : 0,
    (errors.jumlahPinjaman.length === 0 && fields.jumlahPinjaman.trim()) && (errors.tenor.length === 0 && fields.tenor) ? 1 : 0,
  ];
  const stepsCompleted = stepFilled.reduce((a, b) => a + b, 0);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    setSubmitted(false);
    setResult(null);
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }, []);

  function handleSubmit() {
    /* Touch all fields to trigger all errors */
    setTouched({ namaLengkap: true, penghasilan: true, jumlahPinjaman: true, tenor: true, tujuan: true });
    if (!allValid) return;

    const pokok = Number(fields.jumlahPinjaman);
    const tenorBulan = Number(fields.tenor);
    const bunga = BUNGA_RATES[fields.tenor];
    const { cicilan, totalBayar, totalBunga } = calcKredit(pokok, bunga, tenorBulan);
    const dsr = (cicilan / Number(fields.penghasilan)) * 100;

    setResult({ cicilan, totalBayar, totalBunga, bunga, dsr, pokok, tenorBulan });
    setSubmitted(true);
  }

  function handleReset() {
    setFields(INITIAL_FIELDS);
    setTouched(INITIAL_TOUCHED);
    setSubmitted(false);
    setResult(null);
  }

  const ratioColor = result
    ? result.dsr <= 30 ? "var(--green)" : result.dsr <= 50 ? "#e0a84c" : "var(--red)"
    : "var(--green)";

  return (
    <>
      <style>{STYLES}</style>
      <div className="sk-wrap">

        {/* Header */}
        <div className="sk-header">
          <div className="sk-eyebrow">Kredit Personal · NexoBank</div>
          <h1 className="sk-title">Simulasi <em>Pengajuan</em><br />Kredit</h1>
          <p className="sk-desc">
            Hitung estimasi cicilan bulanan, total pembayaran, dan kelayakan pinjaman
            Anda secara instan sebelum mengajukan kredit.
          </p>
        </div>

        {/* Form Card */}
        <div className="sk-card">

          {/* Steps indicator */}
          <Steps filled={stepsCompleted} />

          {/* Progress bar */}
          <div className="sk-progress-wrap">
            <div className="sk-progress-label">
              <span>Kelengkapan formulir</span>
              <span style={{ color: progressPct === 100 ? "var(--green)" : "var(--gold)" }}>
                {progressPct}%
              </span>
            </div>
            <div className="sk-progress-bar">
              <div
                className="sk-progress-fill"
                style={{ width: `${progressPct}%`, background: progressPct === 100 ? "var(--green)" : "var(--gold)" }}
              />
            </div>
          </div>

          {/* ── Section 1: Data Diri ── */}
          <div className="sk-section-label">01 — Data Diri Pemohon</div>

          {/* INPUT 1: Nama Lengkap */}
          <InputField
            label="Nama Lengkap"
            name="namaLengkap"
            value={fields.namaLengkap}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.namaLengkap}
            touched={touched.namaLengkap}
            placeholder="Masukkan nama sesuai KTP"
            hint="Minimal 3 karakter, hanya huruf dan spasi"
          />

          {/* SELECT 1: Tujuan Pinjaman */}
          <SelectField
            label="Tujuan Pinjaman"
            name="tujuan"
            value={fields.tujuan}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.tujuan}
            touched={touched.tujuan}
            placeholder="— Pilih tujuan pinjaman —"
            options={Object.entries(TUJUAN_LABELS).map(([v, l]) => ({ value: v, label: l }))}
          />

          <div className="sk-divider" />

          {/* ── Section 2: Informasi Keuangan ── */}
          <div className="sk-section-label">02 — Informasi Keuangan</div>

          {/* INPUT 2: Penghasilan */}
          <InputField
            label="Penghasilan Bulanan"
            name="penghasilan"
            type="number"
            value={fields.penghasilan}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.penghasilan}
            touched={touched.penghasilan}
            placeholder="Contoh: 8000000"
            prefix="Rp"
            hint="Minimum Rp 1.000.000 — maksimum Rp 500.000.000"
          />

          <div className="sk-divider" />

          {/* ── Section 3: Detail Pinjaman ── */}
          <div className="sk-section-label">03 — Detail Pinjaman</div>

          {/* INPUT 3: Jumlah Pinjaman */}
          <InputField
            label="Jumlah Pinjaman"
            name="jumlahPinjaman"
            type="number"
            value={fields.jumlahPinjaman}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.jumlahPinjaman}
            touched={touched.jumlahPinjaman}
            placeholder="Contoh: 50000000"
            prefix="Rp"
            hint="Minimum Rp 5.000.000 — maksimum 10× penghasilan bulanan"
          />

          {/* SELECT 2: Tenor */}
          <SelectField
            label="Tenor / Jangka Waktu"
            name="tenor"
            value={fields.tenor}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.tenor}
            touched={touched.tenor}
            placeholder="— Pilih tenor —"
            options={[
              { value: "6",  label: "6 Bulan  (Bunga 8% p.a.)" },
              { value: "12", label: "12 Bulan  (Bunga 9% p.a.)" },
              { value: "24", label: "24 Bulan  (Bunga 10.5% p.a.)" },
              { value: "36", label: "36 Bulan  (Bunga 11.5% p.a.)" },
              { value: "48", label: "48 Bulan  (Bunga 12% p.a.)" },
              { value: "60", label: "60 Bulan  (Bunga 12.5% p.a.)" },
            ]}
          />

          {/* Conditional: submit button only when ALL valid */}
          {allValid ? (
            <div className="sk-btn-wrap">
              <button className="sk-submit" onClick={handleSubmit}>
                Hitung Simulasi Kredit →
              </button>
            </div>
          ) : (
            <div className="sk-locked">
              Lengkapi semua field dengan benar untuk melanjutkan
            </div>
          )}
        </div>

        {/* ── Conditional Results ── */}
        {submitted && result && (
          <div className="sk-results">

            <div className="sk-results-header">
              <div className="sk-results-icon">✓</div>
              <div>
                <div className="sk-results-title">Simulasi berhasil dihitung</div>
                <div className="sk-results-sub">
                  Estimasi berdasarkan bunga flat {(result.bunga * 100).toFixed(1)}% per tahun
                </div>
              </div>
            </div>

            <div className="sk-results-card">

              {/* Profile row */}
              <div className="sk-results-profile">
                <div className="sk-profile-avatar">
                  {fields.namaLengkap.trim().charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="sk-profile-name">{fields.namaLengkap.trim()}</div>
                  <div className="sk-profile-meta">
                    {TUJUAN_LABELS[fields.tujuan]} · {result.tenorBulan} bulan
                  </div>
                </div>
                <div className="sk-profile-badge">
                  {result.dsr <= 30 ? "Layak" : result.dsr <= 50 ? "Dipertimbangkan" : "Risiko Tinggi"}
                </div>
              </div>

              {/* Metrics grid */}
              <div className="sk-metrics">
                <ResultMetric
                  label="Cicilan per Bulan"
                  value={fmtCurrency(result.cicilan)}
                  sub={`Selama ${result.tenorBulan} bulan`}
                  variant="gold"
                />
                <ResultMetric
                  label="Total Pembayaran"
                  value={fmtCurrency(result.totalBayar)}
                  sub="Pokok + bunga"
                />
                <ResultMetric
                  label="Total Bunga"
                  value={fmtCurrency(result.totalBunga)}
                  sub={`${((result.totalBunga / result.pokok) * 100).toFixed(1)}% dari pokok`}
                  variant="red"
                />
                <ResultMetric
                  label="Pokok Pinjaman"
                  value={fmtCurrency(result.pokok)}
                  sub="Jumlah yang diterima"
                />
              </div>

              {/* Debt Service Ratio */}
              <div className="sk-ratio-bar">
                <div className="sk-ratio-header">
                  <span className="sk-ratio-label">Rasio Cicilan / Penghasilan (DSR)</span>
                  <span className="sk-ratio-pct" style={{ color: ratioColor }}>
                    {result.dsr.toFixed(1)}%
                  </span>
                </div>
                <div className="sk-ratio-track">
                  <div
                    className="sk-ratio-fill"
                    style={{ width: `${Math.min(result.dsr, 100)}%`, background: ratioColor }}
                  />
                </div>
                <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 6 }}>
                  {result.dsr <= 30
                    ? "Baik — cicilan masih dalam batas aman (≤30% penghasilan)"
                    : result.dsr <= 50
                    ? "Moderat — perlu dipertimbangkan (30–50% penghasilan)"
                    : "Tinggi — beban cicilan melebihi 50% penghasilan"}
                </div>
              </div>

              {/* Breakdown table */}
              <div className="sk-breakdown">
                <div className="sk-breakdown-title">Rincian Perhitungan</div>
                {[
                  ["Penghasilan Bulanan",   fmtCurrency(Number(fields.penghasilan))],
                  ["Pokok Pinjaman",        fmtCurrency(result.pokok)],
                  ["Tenor",                 `${result.tenorBulan} bulan`],
                  ["Suku Bunga",            `${(result.bunga * 100).toFixed(1)}% per tahun`],
                  ["Total Bunga",           fmtCurrency(result.totalBunga)],
                  ["Total Pembayaran",      fmtCurrency(result.totalBayar)],
                  ["Cicilan / Bulan",       fmtCurrency(result.cicilan)],
                ].map(([k, v]) => (
                  <div className="sk-breakdown-row" key={k}>
                    <span className="sk-breakdown-key">{k}</span>
                    <span className="sk-breakdown-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="sk-reset" onClick={handleReset}>
              ← Hitung Ulang Simulasi
            </button>
          </div>
        )}
      </div>
    </>
  );
}