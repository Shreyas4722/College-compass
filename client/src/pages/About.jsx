import './About.css'

function About() {
  return (
    <div className="about-page page">
      <div className="container">
        <div className="about-hero fade-in">
          <h1>About College Compass</h1>
          <p className="hero-subtitle">
            Simplifying campus navigation for Alliance University
          </p>
        </div>

        <div className="about-content">
          <section className="about-section fade-in">
            <h2>Our Mission</h2>
            <p>
              College Compass was created to solve the common challenge of navigating large educational 
              campuses. We believe that finding your way around shouldn't be complicated or require 
              expensive technology. Our goal is to provide a simple, accessible, and eco-friendly 
              solution that works for everyone.
            </p>
          </section>

          <section className="about-section fade-in">
            <h2>The Problem We Solve</h2>
            <div className="problem-grid">
              <div className="problem-card">
                <div className="problem-icon">📋</div>
                <h3>Outdated Directories</h3>
                <p>Printed directories and notice boards quickly become obsolete and are hard to maintain</p>
              </div>
              <div className="problem-card">
                <div className="problem-icon">📱</div>
                <h3>Indoor Navigation Gaps</h3>
                <p>Google Maps works great outdoors but struggles with indoor navigation</p>
              </div>
              <div className="problem-card">
                <div className="problem-icon">💰</div>
                <h3>High Costs</h3>
                <p>AR and IoT-based solutions require expensive hardware and infrastructure</p>
              </div>
              <div className="problem-card">
                <div className="problem-icon">🔋</div>
                <h3>Battery Drain</h3>
                <p>GPS and AR systems consume significant battery power</p>
              </div>
            </div>
          </section>

          <section className="about-section fade-in">
            <h2>Our Solution</h2>
            <div className="solution-features">
              <div className="feature-row">
                <div className="feature-icon">✨</div>
                <div className="feature-content">
                  <h3>Simple Database System</h3>
                  <p>No complex hardware or sensors needed. Just a well-structured database accessible from any device.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="feature-icon">🌐</div>
                <div className="feature-content">
                  <h3>Offline Functionality</h3>
                  <p>Works without internet connectivity, making it eco-friendly and always accessible.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="feature-icon">🎨</div>
                <div className="feature-content">
                  <h3>User-Friendly Interface</h3>
                  <p>Designed for everyone, regardless of technical background or abilities.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="feature-icon">🔒</div>
                <div className="feature-content">
                  <h3>Privacy Focused</h3>
                  <p>No location tracking, camera access, or personal data collection required.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="feature-icon">📈</div>
                <div className="feature-content">
                  <h3>Highly Scalable</h3>
                  <p>Easy to implement in other institutions with minimal modifications.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section team-section fade-in">
            <h2>Our Team</h2>
            <p className="team-intro">
              College Compass is developed as a Design Project-1 by students at Alliance University
            </p>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">AS</div>
                <h3>Animesh Sharma</h3>
                <p>2023BCSE07AED048</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">AM</div>
                <h3>Abhishek Maurya</h3>
                <p>2023BCSE07AED024</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">SS</div>
                <h3>Shreyas S U</h3>
                <p>2023BCSE07AED045</p>
              </div>
            </div>
            <div className="mentor">
              <p><strong>Mentor:</strong> Mr. Sumit Kumar</p>
            </div>
          </section>

          <section className="about-section fade-in">
            <h2>Technology Stack</h2>
            <div className="tech-stack">
              <div className="tech-item">
                <span className="tech-label">Frontend</span>
                <span className="tech-value">React + Vite</span>
              </div>
              <div className="tech-item">
                <span className="tech-label">Backend</span>
                <span className="tech-value">Node.js + Express</span>
              </div>
              <div className="tech-item">
                <span className="tech-label">Database</span>
                <span className="tech-value">MongoDB</span>
              </div>
              <div className="tech-item">
                <span className="tech-label">Deployment</span>
                <span className="tech-value">Vercel / Render</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About
