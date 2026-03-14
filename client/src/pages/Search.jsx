import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const locations = [
  { id:1, name:'BTech Block', building:'Block B', floor:'All floors', type:'Academic', icon:'⚙️', desc:'Alliance School of Engineering — engineering programs and labs.' },
  { id:2, name:'Computing Block', building:'Block C', floor:'All floors', type:'Academic', icon:'💻', desc:'Alliance School of Advanced Computing — CS, IT, and data science.' },
  { id:3, name:'Business Block', building:'Block M', floor:'All floors', type:'Academic', icon:'📊', desc:'Alliance School of Business — MBA, BBA, and management programs.' },
  { id:4, name:'Law Block', building:'Block L', floor:'All floors', type:'Academic', icon:'⚖️', desc:'Alliance School of Law — LLB, LLM, and legal studies.' },
  { id:5, name:'Liberal Arts Block', building:'Block LA', floor:'All floors', type:'Academic', icon:'📚', desc:'Alliance School of Liberal Arts — humanities and social sciences.' },
  { id:6, name:'Sciences Block', building:'Block S', floor:'All floors', type:'Academic', icon:'🔬', desc:'Alliance School of Sciences — physics, chemistry, biology labs.' },
  { id:7, name:'Design Block', building:'Block D', floor:'All floors', type:'Academic', icon:'🎨', desc:'Alliance School of Design — product design and visual arts.' },
  { id:8, name:'Economics Block', building:'Block E', floor:'All floors', type:'Academic', icon:'📈', desc:'Alliance School of Economics — economics, finance, and policy.' },
  { id:9, name:'Film & Media Block', building:'Block FM', floor:'All floors', type:'Academic', icon:'🎬', desc:'Alliance School of Media — film, journalism, and communication.' },
  { id:10, name:'Arts Block', building:'Block A', floor:'All floors', type:'Academic', icon:'🎭', desc:'Alliance School of Fine Arts — performing and visual arts.' },
  { id:11, name:'Admin Block', building:'Admin', floor:'Ground-2nd', type:'Facility', icon:'🏢', desc:'Administration, admissions, and student services.' },
  { id:12, name:'Library', building:'Central', floor:'Ground-3rd', type:'Facility', icon:'📖', desc:'Main campus library with study halls and digital resources.' },
  { id:13, name:'Main Gate', building:'Entrance', floor:'Ground', type:'Facility', icon:'🚪', desc:'Main campus entrance and security.' },
  { id:14, name:'Hostel', building:'Hostel Block', floor:'All floors', type:'Facility', icon:'🏠', desc:'On-campus student accommodation blocks.' },
  { id:15, name:'Auditorium', building:'Central', floor:'Ground', type:'Facility', icon:'🎤', desc:'Main auditorium for convocations and large events.' },
  { id:16, name:'Sports Complex', building:'Sports Block', floor:'Ground', type:'Facility', icon:'🏋️', desc:'Gymnasium, courts, and fitness center.' },
  { id:17, name:'Food Court', building:'Central Plaza', floor:'Ground', type:'Dining', icon:'🍽️', desc:'Multi-cuisine food court with large seating area.' },
  { id:18, name:'Aromas Café', building:'Block B', floor:'Ground', type:'Dining', icon:'☕', desc:'Coffee shop serving beverages and light snacks.' },
  { id:19, name:'Ananta Ahaar', building:'Central', floor:'Ground', type:'Dining', icon:'🍛', desc:'South Indian meals and daily specials.' },
  { id:20, name:'Nescafé', building:'Block M', floor:'Ground', type:'Dining', icon:'☕', desc:'Quick coffee and snacks kiosk.' },
  { id:21, name:'Al Freshco', building:'Block L', floor:'Ground', type:'Dining', icon:'🥗', desc:'Fresh juices, salads, and healthy options.' },
  { id:22, name:'Amul', building:'Block C', floor:'Ground', type:'Dining', icon:'🍦', desc:'Amul ice cream and dairy products kiosk.' },
  { id:23, name:'Dept. Store', building:'Hostel Block', floor:'Ground', type:'Dining', icon:'🛒', desc:'Daily essentials and snacks store near hostels.' },
];

const cats = ['All', 'Academic', 'Facility', 'Dining'];

export default function Search() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const nav = useNavigate();

  const filtered = locations.filter(l =>
    (cat === 'All' || l.type === cat) &&
    (l.name + l.building + l.desc).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <main className="search-page page">
      <div className="page-banner">
        <h1 className="fade-up">Find a Location</h1>
        <p className="fade-up stagger-1">Search 23+ campus buildings, labs and facilities</p>
        <div className="gold-bar" />
        <div className="banner-search-wrap fade-up stagger-2">
          <i className="s-icon">🔍</i>
          <input
            type="text"
            placeholder="Search rooms, buildings, facilities..."
            value={q}
            onChange={e => setQ(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      <div className="search-body container">
        <div className="filter-row">
          {cats.map(c => (
            <button key={c} className={`filter-btn${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>{c}</button>
          ))}
          <span className="results-count">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {filtered.length === 0 ? (
          <div className="no-results">
            <div style={{fontSize:'2rem',marginBottom:'0.5rem'}}>🔍</div>
            <p>No locations match your search.</p>
          </div>
        ) : (
          <div className="loc-grid">
            {filtered.map((loc, i) => (
              <div key={loc.id} className={`loc-card card fade-up stagger-${(i % 4) + 1}`}>
                <div className="loc-top">
                  <span className="loc-icon">{loc.icon}</span>
                  <span className={`tag tag-${loc.type.toLowerCase()}`}>{loc.type}</span>
                </div>
                <h3 className="loc-name">{loc.name}</h3>
                <p className="loc-meta">{loc.building} · {loc.floor}</p>
                <p className="loc-desc">{loc.desc}</p>
                <button className="btn-primary loc-btn" onClick={() => nav('/navigate', { state: { destination: loc.name } })}>
                  Get Directions →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
