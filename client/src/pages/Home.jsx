import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './Home.css';

const stats = [
  { v: '23+', l: 'Locations' },
  { v: '8', l: 'Blocks' },
  { v: '174', l: 'Faculty' },
  { v: '360°', l: 'Tours' },
];
const features = [
  { icon: '🧭', title: 'Navigate', desc: 'Step-by-step walking directions between any two campus points.', link: '/navigate' },
  { icon: '🔍', title: 'Search', desc: 'Find any room, lab, or facility instantly by name or block.', link: '/search' },
  { icon: '👨‍🏫', title: 'Faculty', desc: 'Browse all 174 faculty members by department.', link: '/faculty' },
  { icon: '🌐', title: '360° Tours', desc: 'Immersive virtual tours of every academic block.', link: '/navigate' },
];

export default function Home() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, dots, raf;
    const init = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      dots = Array.from({ length: 30 }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() + 0.5,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fill();
      });
      dots.forEach((a, i) => dots.slice(i + 1).forEach(b => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255,255,255,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }));
      raf = requestAnimationFrame(draw);
    };
    init(); draw();
    window.addEventListener('resize', init);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', init); };
  }, []);

  return (
    <main className="home">

      {/* MAROON HERO BANNER - same as other pages */}
      <section className="home-banner">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="container home-banner-inner">
          <div className="home-banner-text fade-up">
            <p className="home-eyebrow">Alliance University · Bangalore</p>
            <h1>Your Campus<br /><span className="home-outline">Navigation Guide</span></h1>
            <p className="home-sub">Find every room, lab, faculty cabin, and facility across campus — no app, no GPS, no login required.</p>
            <div className="home-btns">
              <Link to="/navigate" className="btn-home-primary">Get Directions →</Link>
              <Link to="/search" className="btn-home-outline">Browse Locations</Link>
            </div>
          </div>
        </div>
        <div className="home-gold-bar" />
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-row">
            {stats.map(s => (
              <div key={s.l} className="stat">
                <span className="stat-v">{s.v}</span>
                <span className="stat-l">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="feats-section">
        <div className="container">
          <div className="sec-head fade-up">
            <p className="eyebrow">What you can do</p>
            <h2>Everything you need on one platform</h2>
          </div>
          <div className="feats-grid">
            {features.map((f, i) => (
              <Link to={f.link} key={f.title} className={`feat-card card fade-up stagger-${i + 1}`}>
                <span className="feat-ic">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className="feat-cta">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-text">
              <h2>Lost on campus?</h2>
              <p>Pick where you are and where you need to go.</p>
            </div>
            <Link to="/navigate" className="btn-home-primary">Open Navigator →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
