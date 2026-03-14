import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Navigate.css';

const LOCS = [
  'Main Gate','Admin Block','BTech Block','Computing Block','Business Block',
  'Law Block','Liberal Arts Block','Sciences Block','Design Block','Economics Block',
  'Film & Media Block','Arts Block','Library','Hostel','Auditorium','Sports Complex',
  'Food Court','Aromas Café','Ananta Ahaar','Nescafé','Al Freshco','Amul','Dept. Store',
];

const TOURS = {
  'BTech Block':        'https://www.alliance.edu.in/campus-tour/asae.html',
  'Liberal Arts Block': 'https://www.alliance.edu.in/campus-tour/asla.html',
  'Law Block':          'https://www.alliance.edu.in/campus-tour/asol.html',
  'Computing Block':    'https://www.alliance.edu.in/campus-tour/asac.html',
  'Sciences Block':     'https://www.alliance.edu.in/campus-tour/asos.html',
  'Business Block':     'https://www.alliance.edu.in/campus-tour/asob.html',
  'Design Block':       'https://www.alliance.edu.in/campus-tour/asod.html',
  'Economics Block':    'https://www.alliance.edu.in/campus-tour/asoe.html',
  'Film & Media Block': 'https://www.alliance.edu.in/campus-tour/asofm.html',
  'Arts Block':         'https://www.alliance.edu.in/campus-tour/asopvca.html',
  'Admin Block':        'https://www.alliance.edu.in/campus-tour/allianceuniversity.html',
  'Library':            'https://www.alliance.edu.in/campus-tour/allianceuniversity.html',
};

// Google Maps satellite aerial embed of Alliance University campus
const AERIAL_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.0!2d77.6892!3d12.8458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6b1451863a8b%3A0xd89a0e97109ef8c7!2sAlliance%20University!5e1!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';

const ROUTES = {
  'Main Gate|Admin Block': ['Exit through Main Gate security checkpoint','Walk straight along the main road (~80m)','Admin Block is on your left — look for the blue signboard'],
  'Main Gate|Library': ['Enter campus from Main Gate','Follow the central path past the fountain (~120m)','Library is the tall building on your right'],
  'Main Gate|BTech Block': ['Enter campus and take the right fork at the roundabout','Walk ~150m along the engineering road','BTech Block is the large building on your left'],
  'Main Gate|Computing Block': ['Enter campus, walk straight ~100m','Take the left path at the central plaza','Computing Block is signposted — look for the CS banner'],
  'Main Gate|Food Court': ['Walk straight from Main Gate ~200m','Turn right at the Central Plaza fountain','Food Court is at the end of the plaza'],
  'Main Gate|Hostel': ['Enter campus and follow the right perimeter road','Hostel Block is at the far right of campus (~400m from gate)','Look for the tall residential buildings'],
  'Admin Block|Library': ['Exit Admin Block main entrance','Walk straight ~60m east','Library entrance is directly ahead'],
  'Admin Block|BTech Block': ['From Admin Block, head south along the main road','BTech Block is ~200m — follow Engineering signboards'],
  'BTech Block|Computing Block': ['Exit BTech Block from the south exit','Computing Block is adjacent — ~50m walk across the courtyard'],
  'BTech Block|Food Court': ['Exit BTech Block ground floor','Walk north toward Central Plaza (~180m)','Food Court is on the left side of the plaza'],
  'Library|Aromas Café': ['Exit Library, turn left toward Block B','Aromas Café is on the ground floor (~90m walk)'],
  'Hostel|Food Court': ['Exit Hostel Block main gate','Walk toward Central Plaza (~250m)','Food Court is at the plaza'],
  'Sports Complex|Hostel': ['Exit Sports Complex main entrance','Walk east along the perimeter road (~150m)','Hostel Block is at the end of the road'],
};

function getSteps(from, to) {
  if (!from || !to || from === to) return null;
  const k1 = `${from}|${to}`, k2 = `${to}|${from}`;
  if (ROUTES[k1]) return ROUTES[k1];
  if (ROUTES[k2]) return [...ROUTES[k2]].reverse().map(s => s + ' (reverse)');
  return [`Start at ${from}`, 'Head toward the main campus road', 'Follow campus signboards', `Arrive at ${to}`, 'Ask security if needed'];
}

export default function Navigate() {
  const loc = useLocation();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [steps, setSteps] = useState(null);
  const [view, setView] = useState(null); // null | 'tour' | 'aerial'

  useEffect(() => {
    if (loc.state?.destination) setTo(loc.state.destination);
  }, [loc.state]);

  const go = () => { setSteps(getSteps(from, to)); setView(null); };
  const hasTour = TOURS[to];

  return (
    <main className="nav-page page">
      <div className="page-banner">
        <h1 className="fade-up">Campus Navigator</h1>
        <p className="fade-up stagger-1">Step-by-step walking directions across campus</p>
        <div className="gold-bar" />
      </div>

      <div className="nav-body container">
        {loc.state?.destination && (
          <div className="prefill-notice fade-up">
            📍 Destination pre-filled — choose your starting point below
          </div>
        )}

        {/* Direction form */}
        <div className="nav-card card fade-up stagger-1">
          <div className="selects-row">
            <div className="sel-group">
              <label>From</label>
              <select value={from} onChange={e => setFrom(e.target.value)}>
                <option value="">Where are you now?</option>
                {LOCS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <button className="swap-btn" onClick={() => { setFrom(to); setTo(from); }}>⇅</button>
            <div className="sel-group">
              <label>To</label>
              <select value={to} onChange={e => setTo(e.target.value)}>
                <option value="">Where do you want to go?</option>
                {LOCS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <button className="btn-primary go-btn" onClick={go} disabled={!from || !to || from === to}>
            Get Directions →
          </button>
        </div>

        {/* Directions result */}
        {steps && (
          <div className="dir-card card fade-up">
            <div className="dir-header">
              <span className="dir-route">{from} → {to}</span>
              <div className="view-tabs">
                {hasTour && (
                  <button
                    className={`view-tab${view === 'tour' ? ' active' : ''}`}
                    onClick={() => setView(view === 'tour' ? null : 'tour')}
                  >
                    🌐 360° Tour
                  </button>
                )}
                <button
                  className={`view-tab${view === 'aerial' ? ' active' : ''}`}
                  onClick={() => setView(view === 'aerial' ? null : 'aerial')}
                >
                  🛰️ Aerial View
                </button>
              </div>
            </div>

            {/* 360 Tour iframe */}
            {view === 'tour' && hasTour && (
              <div className="view-frame">
                <div className="frame-label">🌐 Official Alliance University Virtual Tour</div>
                <iframe src={TOURS[to]} allowFullScreen loading="lazy" title={`360° tour of ${to}`} />
              </div>
            )}

            {/* Aerial / satellite view */}
            {view === 'aerial' && (
              <div className="view-frame">
                <div className="frame-label">🛰️ Alliance University Campus — Satellite Aerial View</div>
                <iframe
                  src={AERIAL_URL}
                  allowFullScreen
                  loading="lazy"
                  title="Alliance University Aerial View"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}

            <ol className="steps-list">
              {steps.map((s, i) => (
                <li key={i} className="step">
                  <span className="step-n">{i + 1}</span>
                  <span className="step-t">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Standalone aerial view card (always visible) */}
        <div className="aerial-card card fade-up stagger-2">
          <div className="aerial-header">
            <div>
              <h3>🛰️ Campus Aerial View</h3>
              <p>Satellite view of Alliance University — Chandapura, Bengaluru</p>
            </div>
            <span className="aerial-badge">Live Map</span>
          </div>
          <div className="aerial-frame">
            <iframe
              src={AERIAL_URL}
              allowFullScreen
              loading="lazy"
              title="Alliance University Campus Aerial"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Location chips */}
        <div className="chips-section">
          <p className="chips-label">Browse Locations</p>
          {[
            { cat: 'Academic', items: ['BTech Block','Computing Block','Business Block','Law Block','Liberal Arts Block','Sciences Block','Design Block','Economics Block','Film & Media Block','Arts Block'] },
            { cat: 'Facility', items: ['Admin Block','Library','Main Gate','Hostel','Auditorium','Sports Complex'] },
            { cat: 'Dining', items: ['Food Court','Aromas Café','Ananta Ahaar','Nescafé','Al Freshco','Amul','Dept. Store'] },
          ].map(g => (
            <div key={g.cat} className="chip-group">
              <p className="chip-cat">{g.cat}</p>
              <div className="chips">
                {g.items.map(item => (
                  <button key={item} className={`chip${TOURS[item] ? ' has-tour' : ''}`} onClick={() => setTo(item)}>
                    {item}{TOURS[item] ? ' 🌐' : ''}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <p className="chips-hint">🌐 = has 360° virtual tour · click any location to set as destination</p>
        </div>
      </div>
    </main>
  );
}
