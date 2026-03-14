import './About.css';

const stack = [
  ['Frontend', 'React 18 + Vite'],
  ['Backend', 'Node.js + Express'],
  ['Database', 'MongoDB Atlas'],
  ['Deployment', 'Vercel + Render'],
  ['Maps', 'Google Street View 360°'],
];

const team = [
  { name: 'Shreyas', role: 'Lead Developer', dept: 'CSE' },
  { name: 'Abhishek Maurya', role: 'Frontend Developer', dept: 'CSE' },
];

const points = [
  ['🚫', 'No app install required'],
  ['📡', 'Works without GPS or internet after load'],
  ['🔒', 'No login or tracking'],
  ['📱', 'Fully responsive on mobile'],
];

export default function About() {
  return (
    <main className="about-page page">
      <div className="page-banner">
        <h1 className="fade-up">About College Compass</h1>
        <p className="fade-up stagger-1">Built for students, by students of Alliance University</p>
        <div className="gold-bar" />
      </div>

      <div className="about-body container">
        <section className="about-mission fade-up">
          <div className="mission-text">
            <p className="eyebrow">Our Mission</p>
            <h2>No more getting lost on day one</h2>
            <p>Alliance University's campus spans multiple blocks with hundreds of rooms, labs, and facilities. New students, visitors, and even seniors struggle to find their way. College Compass solves that — a fast, browser-based tool that works on any device, no app required.</p>
          </div>
          <div className="mission-points">
            {points.map(([icon, text]) => (
              <div key={text} className="mpoint">
                <span>{icon}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-stack fade-up stagger-2">
          <h3>Technology Stack</h3>
          <div className="stack-table">
            {stack.map(([label, value]) => (
              <div key={label} className="stack-row">
                <span className="s-label">{label}</span>
                <span className="s-value">{value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="about-team fade-up stagger-3">
          <h3>The Team</h3>
          <div className="team-grid">
            {team.map(t => (
              <div key={t.name} className="team-card card">
                <div className="t-avatar">{t.name[0]}</div>
                <div className="t-info">
                  <strong>{t.name}</strong>
                  <p>{t.role}</p>
                  <span className="tag tag-academic">{t.dept}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
