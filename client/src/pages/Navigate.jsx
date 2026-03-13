import { useState } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Inter:wght@400;500;600&display=swap');

.np * { box-sizing: border-box; margin: 0; padding: 0; }

.np {
  min-height: 100vh;
  background: #f5f5f5;
  font-family: 'Inter', sans-serif;
  color: #1a1a1a;
}

/* ── HEADER ── */
.np-header {
  background: #7b0c0c;
  padding: 0 32px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 3px solid #a88c3a;
}
.np-header-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-family: 'Merriweather', serif;
  font-size: 15px;
}
.np-header-sub {
  font-size: 12px;
  color: #d4b896;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* ── HERO ── */
.np-hero {
  background: #7b0c0c;
  padding: 48px 32px 52px;
  text-align: center;
  border-bottom: 1px solid #a88c3a;
}
.np-hero h1 {
  font-family: 'Merriweather', serif;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
  line-height: 1.3;
}
.np-hero p {
  color: #d4b896;
  font-size: 14px;
  letter-spacing: 0.03em;
}

/* ── CONTAINER ── */
.np-body {
  max-width: 780px;
  margin: 0 auto;
  padding: 36px 24px 80px;
}

/* ── CARD ── */
.np-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 28px;
  margin-bottom: 24px;
}

/* ── ROUTE ROW ── */
.np-row { display: flex; align-items: flex-end; gap: 12px; flex-wrap: wrap; }
.np-group { flex: 1; min-width: 210px; }
.np-lbl {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: #888; margin-bottom: 7px;
}
.dot-g { width: 8px; height: 8px; border-radius: 50%; background: #2e7d32; display: inline-block; }
.dot-r { width: 8px; height: 8px; border-radius: 50%; background: #7b0c0c; display: inline-block; }

.np-sel {
  width: 100%; background: #fafafa;
  border: 1px solid #ddd; border-radius: 4px;
  padding: 11px 14px; color: #aaa;
  font-family: 'Inter', sans-serif; font-size: 14px;
  cursor: pointer; display: flex; align-items: center;
  justify-content: space-between;
  transition: border-color 0.15s; text-align: left;
}
.np-sel:hover { border-color: #7b0c0c; }
.np-sel.on { color: #1a1a1a; border-color: #7b0c0c; background: #fff; }

.np-ddwrap { position: relative; }
.np-dd {
  position: absolute; top: calc(100% + 4px); left: 0; right: 0;
  background: #fff; border: 1px solid #ddd;
  border-top: 2px solid #7b0c0c;
  border-radius: 0 0 4px 4px;
  z-index: 999; box-shadow: 0 8px 24px rgba(0,0,0,0.1); overflow: hidden;
}
.np-qsearch {
  width: 100%; background: #fafafa; border: none;
  border-bottom: 1px solid #eee; padding: 10px 14px;
  font-family: 'Inter', sans-serif; font-size: 13px;
  color: #1a1a1a; outline: none;
}
.np-qsearch::placeholder { color: #bbb; }
.np-cattabs { display: flex; background: #fafafa; border-bottom: 1px solid #eee; }
.np-cattab {
  flex: 1; background: none; border: none;
  border-bottom: 2px solid transparent;
  padding: 7px 4px; font-family: 'Inter', sans-serif;
  font-size: 11px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.07em;
  color: #999; cursor: pointer; transition: color 0.15s;
}
.np-cattab.on { color: #7b0c0c; border-bottom-color: #7b0c0c; }
.np-list { max-height: 220px; overflow-y: auto; }
.np-item {
  width: 100%; background: none; border: none;
  border-bottom: 1px solid #f5f5f5; padding: 10px 14px;
  font-family: 'Inter', sans-serif; font-size: 13px;
  color: #1a1a1a; cursor: pointer; display: flex;
  align-items: center; gap: 10px; text-align: left;
  transition: background 0.1s;
}
.np-item:hover { background: #fdf8f8; }
.np-iname { font-weight: 500; }
.np-icat { font-size: 11px; color: #999; margin-top: 1px; }
.np-empty { padding: 16px; text-align: center; color: #bbb; font-size: 13px; font-style: italic; }

.np-swap {
  width: 38px; height: 38px; border-radius: 50%;
  background: #f5f5f5; border: 1px solid #ddd;
  color: #888; font-size: 16px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; align-self: flex-end; transition: all 0.2s;
}
.np-swap:hover { background: #7b0c0c; color: #fff; border-color: #7b0c0c; transform: rotate(180deg); }

.np-actions { display: flex; gap: 10px; margin-top: 18px; }
.np-gobtn {
  flex: 1; background: #7b0c0c; border: none; border-radius: 4px;
  padding: 12px 24px; color: #fff;
  font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
  cursor: pointer; letter-spacing: 0.02em; transition: background 0.15s;
}
.np-gobtn:hover:not(:disabled) { background: #961010; }
.np-gobtn:disabled { opacity: 0.35; cursor: not-allowed; }
.np-resetbtn {
  background: #fff; border: 1px solid #ddd; border-radius: 4px;
  padding: 12px 16px; font-family: 'Inter', sans-serif;
  font-size: 13px; color: #888; cursor: pointer; transition: all 0.15s;
}
.np-resetbtn:hover { border-color: #7b0c0c; color: #7b0c0c; background: #fdf8f8; }

/* ── RESULT ── */
.np-result {
  background: #fff; border: 1px solid #ddd; border-radius: 6px;
  overflow: hidden; animation: slideUp 0.3s ease;
}
@keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

.np-routebar {
  background: #7b0c0c; padding: 14px 24px;
  display: flex; align-items: center; gap: 10px;
  flex-wrap: wrap; border-bottom: 2px solid #a88c3a;
}
.np-rpt { display: flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 500; color: #fff; }
.np-rdotg { width: 7px; height: 7px; border-radius: 50%; background: #66bb6a; flex-shrink: 0; }
.np-rdotr { width: 7px; height: 7px; border-radius: 50%; background: #a88c3a; flex-shrink: 0; }
.np-arrow { flex: 1; text-align: center; color: #a88c3a; font-size: 18px; min-width: 20px; }

.np-tabs {
  display: flex; border-bottom: 1px solid #eee;
  background: #fafafa; padding: 0 20px;
}
.np-tab {
  background: none; border: none; border-bottom: 2px solid transparent;
  padding: 12px 14px; font-family: 'Inter', sans-serif;
  font-size: 13px; font-weight: 500; color: #999;
  cursor: pointer; transition: color 0.15s; margin-bottom: -1px;
}
.np-tab:hover { color: #7b0c0c; }
.np-tab.on { color: #7b0c0c; border-bottom-color: #7b0c0c; font-weight: 600; }

/* DIRECTIONS */
.np-dirpanel { padding: 24px; }
.np-dirhdr {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid #eee;
}
.np-dirhdr h3 { font-family: 'Merriweather', serif; font-size: 1rem; font-weight: 700; color: #1a1a1a; }
.np-badge {
  font-size: 11px; font-weight: 600; color: #7b0c0c;
  background: #fdf0f0; border: 1px solid #e8c4c4;
  padding: 3px 10px; border-radius: 3px; letter-spacing: 0.04em;
}
.np-steps { display: flex; flex-direction: column; margin-bottom: 28px; }
.np-step {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 14px 0; border-bottom: 1px solid #f5f5f5;
  animation: fadeIn 0.25s ease both;
}
.np-step:last-child { border-bottom: none; }
.np-step:nth-child(1){animation-delay:.05s}
.np-step:nth-child(2){animation-delay:.1s}
.np-step:nth-child(3){animation-delay:.15s}
.np-step:nth-child(4){animation-delay:.2s}
@keyframes fadeIn { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }
.np-stepnum {
  width: 28px; height: 28px; background: #7b0c0c; color: #fff;
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0;
}
.np-steptext { font-size: 14px; line-height: 1.6; color: #333; padding-top: 4px; }
.np-maplabel {
  font-size: 11px; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.1em; color: #999; margin: 0 0 10px;
}
.np-mapwrap { border-radius: 4px; overflow: hidden; border: 1px solid #ddd; }

/* ── 360° TOUR PANEL ── */
.np-tourpanel { padding: 24px; }
.np-tour-hdr { margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid #eee; }
.np-tour-hdr h3 { font-family: 'Merriweather', serif; font-size: 1rem; font-weight: 700; margin-bottom: 4px; }
.np-tour-hdr p { font-size: 13px; color: #888; }

/* 360 open button */
.np-tour-openbtn {
  display: inline-flex; align-items: center; gap: 8px;
  background: #7b0c0c; color: #fff;
  border: none; border-radius: 4px;
  padding: 10px 20px; margin-bottom: 16px;
  font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600;
  cursor: pointer; text-decoration: none;
  transition: background 0.15s;
}
.np-tour-openbtn:hover { background: #961010; }

/* iframe wrapper with overlay fallback */
.np-tour-frame-wrap {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  background: #111;
}
.np-tour-frame-wrap iframe {
  display: block;
  width: 100%;
  height: 480px;
  border: none;
}
/* fallback shown if iframe fails to load */
.np-tour-fallback {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 48px 24px;
  text-align: center;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.np-tour-fallback.show { display: flex; }
.np-tour-fallback-icon { font-size: 40px; }
.np-tour-fallback h4 { font-family: 'Merriweather', serif; font-size: 15px; color: #1a1a1a; }
.np-tour-fallback p { font-size: 13px; color: #888; max-width: 320px; line-height: 1.6; }

/* note box */
.np-tour-note {
  background: #fdf8ec;
  border: 1px solid #e8d9a0;
  border-left: 3px solid #a88c3a;
  border-radius: 3px;
  padding: 10px 14px;
  font-size: 12px;
  color: #7a6020;
  margin-top: 12px;
  line-height: 1.6;
}

/* ── QUICK PICK ── */
.np-quickpick { margin-top: 4px; }
.np-qp-label {
  font-size: 11px; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.12em; color: #999; margin-bottom: 20px;
  display: flex; align-items: center; gap: 10px;
}
.np-qp-label::after { content: ''; flex: 1; height: 1px; background: #eee; }
.np-qp-section { margin-bottom: 22px; }
.np-qp-title {
  font-size: 13px; font-weight: 600; color: #7b0c0c;
  margin-bottom: 10px; display: flex; align-items: center; gap: 6px;
}
.np-chips { display: flex; flex-wrap: wrap; gap: 7px; }
.np-chip {
  background: #fff; border: 1px solid #ddd; border-radius: 3px;
  padding: 7px 13px; font-family: 'Inter', sans-serif;
  font-size: 12px; font-weight: 500; color: #444;
  cursor: pointer; display: flex; align-items: center; gap: 5px;
  transition: all 0.15s;
}
.np-chip:hover { border-color: #7b0c0c; color: #7b0c0c; background: #fdf8f8; }
.np-hint { font-size: 12px; color: #bbb; text-align: center; margin-top: 8px; font-style: italic; }

@media (max-width: 560px) {
  .np-row { flex-direction: column; }
  .np-group { min-width: 100%; }
  .np-swap { align-self: center; transform: rotate(90deg); }
  .np-swap:hover { transform: rotate(270deg); }
  .np-header, .np-hero { padding-left: 16px; padding-right: 16px; }
  .np-body { padding: 24px 16px 60px; }
  .np-tabs { overflow-x: auto; }
}
`;

const LOCS = [
  {id:"asae",   cat:"Academic", tour:"https://www.alliance.edu.in/campus-tour/asae.html",    icon:"⚙️", short:"BTech Block"},
  {id:"asac",   cat:"Academic", tour:"https://www.alliance.edu.in/campus-tour/asac.html",    icon:"💻", short:"Computing Block"},
  {id:"asob",   cat:"Academic", tour:"https://www.alliance.edu.in/campus-tour/asob.html",    icon:"💼", short:"Business Block"},
  {id:"asol",   cat:"Academic", tour:"https://www.alliance.edu.in/campus-tour/asol.html",    icon:"⚖️", short:"Law Block"},
  {id:"asla",   cat:"Academic", tour:"https://www.alliance.edu.in/campus-tour/asla.html",    icon:"📚", short:"Liberal Arts Block"},
  {id:"asos",   cat:"Academic", tour:"https://www.alliance.edu.in/campus-tour/asos.html",    icon:"🔬", short:"Sciences Block"},
  {id:"asod",   cat:"Academic", tour:"https://www.alliance.edu.in/campus-tour/asod.html",    icon:"🎨", short:"Design Block"},
  {id:"asoe",   cat:"Academic", tour:"https://www.alliance.edu.in/campus-tour/asoe.html",    icon:"📈", short:"Economics Block"},
  {id:"asofm",  cat:"Academic", tour:"https://www.alliance.edu.in/campus-tour/asofm.html",   icon:"🎬", short:"Film & Media Block"},
  {id:"asopvca",cat:"Academic", tour:"https://www.alliance.edu.in/campus-tour/asopvca.html", icon:"🎭", short:"Arts Block"},
  {id:"admin",      cat:"Facility", tour:null, icon:"🏛️", short:"Admin Block"},
  {id:"library",    cat:"Facility", tour:null, icon:"📖", short:"Library"},
  {id:"maingate",   cat:"Facility", tour:null, icon:"🚪", short:"Main Gate"},
  {id:"hostel",     cat:"Facility", tour:null, icon:"🏠", short:"Hostel"},
  {id:"auditorium", cat:"Facility", tour:null, icon:"🎤", short:"Auditorium"},
  {id:"sports",     cat:"Facility", tour:null, icon:"🏋️", short:"Sports Complex"},
  {id:"foodcourt",  cat:"Dining",   tour:null, icon:"🍽️", short:"Food Court"},
  {id:"aromas",     cat:"Dining",   tour:null, icon:"☕", short:"Aromas"},
  {id:"ananta",     cat:"Dining",   tour:null, icon:"🍛", short:"Ananta Ahaar"},
  {id:"nescafe",    cat:"Dining",   tour:null, icon:"☕", short:"Nescafé"},
  {id:"alfreshco",  cat:"Dining",   tour:null, icon:"🥗", short:"Al Freshco"},
  {id:"amul",       cat:"Dining",   tour:null, icon:"🍦", short:"Amul"},
  {id:"depstore",   cat:"Dining",   tour:null, icon:"🛒", short:"Dept. Store"},
];

const CATS = ["All","Academic","Facility","Dining"];

const DIRS = {
  dining:[
    {n:1,t:"Exit your current block and walk towards the central campus plaza."},
    {n:2,t:"Follow the main campus road towards the dining area."},
    {n:3,t:"Dining outlets are in the central zone — follow the signboards."},
    {n:4,t:"You have arrived. Enjoy your meal! 🍽️"},
  ],
  academic:[
    {n:1,t:"Exit your current location and head to the main campus road."},
    {n:2,t:"Follow the academic block signboards along the central walkway."},
    {n:3,t:"Continue past the Admin Block on your left."},
    {n:4,t:"Your destination block will be visible on the right. You have arrived! 🎓"},
  ],
  admin:[
    {n:1,t:"Make your way to the main campus road."},
    {n:2,t:"Walk towards the main gate — the Admin Block is the large building near the entrance."},
    {n:3,t:"The Admin Block will be directly ahead of you."},
    {n:4,t:"You have arrived at the Admin Block. 🏛️"},
  ],
  default:[
    {n:1,t:"Head towards the main campus road from your starting point."},
    {n:2,t:"Follow the central walkway and look for directional signboards."},
    {n:3,t:"Continue in the direction of your destination block."},
    {n:4,t:"You have arrived! ✅"},
  ],
};

function getDirs(from, to) {
  if (!from || !to) return [];
  if (to.cat === "Dining")    return DIRS.dining;
  if (to.id  === "admin")     return DIRS.admin;
  if (to.cat === "Academic")  return DIRS.academic;
  return DIRS.default;
}

/* Smart 360° panel — tries iframe, shows fallback + open button if blocked */
function TourPanel({ loc }) {
  const [blocked, setBlocked] = useState(false);

  return (
    <div className="np-tourpanel">
      <div className="np-tour-hdr">
        <h3>360° Virtual Tour — {loc.short}</h3>
        <p>Powered by Alliance University's official virtual tour</p>
      </div>

      {/* Always show the open-in-new-tab button */}
      <a
        className="np-tour-openbtn"
        href={loc.tour}
        target="_blank"
        rel="noopener noreferrer"
      >
        ↗ Open Full 360° Tour
      </a>

      {/* Try embedded iframe */}
      {!blocked ? (
        <>
          <div className="np-tour-frame-wrap">
            <iframe
              title={`360 Tour - ${loc.short}`}
              src={loc.tour}
              allowFullScreen
              onError={() => setBlocked(true)}
            />
          </div>
          <div className="np-tour-note">
            💡 If the tour appears blank or shows an error, click <strong>"Open Full 360° Tour"</strong> above to view it directly on Alliance University's website.
          </div>
        </>
      ) : (
        <div className="np-tour-fallback show">
          <div className="np-tour-fallback-icon">🌐</div>
          <h4>Preview not available here</h4>
          <p>
            Alliance University's 360° tour cannot be embedded directly.
            Click the button above to open it in a new tab.
          </p>
        </div>
      )}
    </div>
  );
}

function Dropdown({ value, onChange, exclude, placeholder }) {
  const [open, setOpen] = useState(false);
  const [q, setQ]       = useState("");
  const [cat, setCat]   = useState("All");

  const list = LOCS.filter(l =>
    (cat === "All" || l.cat === cat) &&
    l.short.toLowerCase().includes(q.toLowerCase()) &&
    l.id !== exclude?.id
  );

  return (
    <div className="np-ddwrap">
      <button
        className={`np-sel${value ? " on" : ""}`}
        onClick={() => setOpen(o => !o)}
      >
        <span>
          {value
            ? <>{value.icon}&nbsp; {value.short}</>
            : <span style={{color:"#bbb"}}>{placeholder}</span>
          }
        </span>
        <span style={{fontSize:10,color:"#bbb"}}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="np-dd">
          <input
            className="np-qsearch"
            placeholder="Search..."
            value={q}
            onChange={e => setQ(e.target.value)}
            autoFocus
          />
          <div className="np-cattabs">
            {CATS.map(c => (
              <button
                key={c}
                className={`np-cattab${cat === c ? " on" : ""}`}
                onClick={() => setCat(c)}
              >{c}</button>
            ))}
          </div>
          <div className="np-list">
            {list.map(loc => (
              <button
                key={loc.id}
                className="np-item"
                onClick={() => { onChange(loc); setOpen(false); setQ(""); }}
              >
                <span style={{fontSize:16,width:20,textAlign:"center"}}>{loc.icon}</span>
                <div>
                  <div className="np-iname">{loc.short}</div>
                  <div className="np-icat">{loc.cat}</div>
                </div>
              </button>
            ))}
            {list.length === 0 && <div className="np-empty">No results</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navigate() {
  const [from,   setFrom]   = useState(null);
  const [to,     setTo]     = useState(null);
  const [result, setResult] = useState(null);
  const [tab,    setTab]    = useState("dir");

  const go    = () => { if (!from || !to) return; setResult({ from, to, dirs: getDirs(from, to) }); setTab("dir"); };
  const reset = () => { setFrom(null); setTo(null); setResult(null); };
  const swap  = () => { const t = from; setFrom(to); setTo(t); };

  return (
    <div className="np">
      <style>{css}</style>

      {/* Header */}
      <div className="np-header">
        <div className="np-header-brand">
          <span>🧭</span>
          <span>Campus Compass</span>
        </div>
        <span className="np-header-sub">Alliance University</span>
      </div>

      {/* Hero */}
      <div className="np-hero">
        <h1>Find your way around campus</h1>
        <p>Select a start point and destination to get walking directions</p>
      </div>

      <div className="np-body">

        {/* Search card */}
        <div className="np-card">
          <div className="np-row">
            <div className="np-group">
              <div className="np-lbl"><span className="dot-g" /> Starting point</div>
              <Dropdown value={from} onChange={setFrom} exclude={to}   placeholder="Where are you now?" />
            </div>
            <button className="np-swap" onClick={swap}>⇅</button>
            <div className="np-group">
              <div className="np-lbl"><span className="dot-r" /> Destination</div>
              <Dropdown value={to}   onChange={setTo}   exclude={from} placeholder="Where do you want to go?" />
            </div>
          </div>
          <div className="np-actions">
            <button className="np-gobtn" onClick={go} disabled={!from || !to}>
              Get Directions
            </button>
            {result && <button className="np-resetbtn" onClick={reset}>Clear</button>}
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="np-result">

            {/* Route bar */}
            <div className="np-routebar">
              <div className="np-rpt"><span className="np-rdotg" />{result.from.icon}&nbsp;{result.from.short}</div>
              <div className="np-arrow">→</div>
              <div className="np-rpt"><span className="np-rdotr" />{result.to.icon}&nbsp;{result.to.short}</div>
            </div>

            {/* Tabs */}
            <div className="np-tabs">
              <button className={`np-tab${tab==="dir"?" on":""}`}      onClick={() => setTab("dir")}>
                Directions
              </button>
              {result.to.tour && (
                <button className={`np-tab${tab==="to360"?" on":""}`}  onClick={() => setTab("to360")}>
                  360° — Destination
                </button>
              )}
              {result.from.tour && (
                <button className={`np-tab${tab==="from360"?" on":""}`} onClick={() => setTab("from360")}>
                  360° — Start Point
                </button>
              )}
            </div>

            {/* Directions tab */}
            {tab === "dir" && (
              <div className="np-dirpanel">
                <div className="np-dirhdr">
                  <h3>Walking Directions</h3>
                  <span className="np-badge">⏱ 5–10 min walk</span>
                </div>
                <div className="np-steps">
                  {result.dirs.map(d => (
                    <div className="np-step" key={d.n}>
                      <div className="np-stepnum">{d.n}</div>
                      <div className="np-steptext">{d.t}</div>
                    </div>
                  ))}
                </div>
                <p className="np-maplabel">Campus Map</p>
                <div className="np-mapwrap">
                  <iframe
                    title="Alliance University Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.438505528079!2d77.68137731482268!3d12.840599490933876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6b47b496c013%3A0x808b7ce3f9ed4831!2sAlliance%20University!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                    width="100%" height="280"
                    style={{border:0, display:"block"}}
                    allowFullScreen loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* 360° destination tab */}
            {tab === "to360" && result.to.tour && (
              <TourPanel loc={result.to} />
            )}

            {/* 360° start tab */}
            {tab === "from360" && result.from.tour && (
              <TourPanel loc={result.from} />
            )}

          </div>
        )}

        {/* Quick pick grid */}
        {!result && (
          <div className="np-quickpick">
            <p className="np-qp-label">Browse locations</p>
            {["Academic","Facility","Dining"].map(c => (
              <div className="np-qp-section" key={c}>
                <p className="np-qp-title">
                  {c==="Academic" ? "🏫" : c==="Facility" ? "🏢" : "🍽️"}&nbsp;{c}
                </p>
                <div className="np-chips">
                  {LOCS.filter(l => l.cat === c).map(loc => (
                    <button
                      key={loc.id}
                      className="np-chip"
                      onClick={() => { if(!from) setFrom(loc); else if(!to && loc.id!==from.id) setTo(loc); }}
                    >
                      {loc.icon} {loc.short}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <p className="np-hint">Click any location to set it as your start or destination</p>
          </div>
        )}

      </div>
    </div>
  );
}
