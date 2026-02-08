import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title">
              Navigate Campus
              <span className="hero-highlight">Effortlessly</span>
            </h1>
            <p className="hero-description">
              Your smart guide to Alliance University. Find classrooms, faculty offices, 
              cafeterias, libraries, and more—all in one place, completely offline.
            </p>
            <div className="hero-buttons">
              <Link to="/search" className="btn btn-primary">
                Start Exploring
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="hero-visual fade-in">
            <div className="visual-card card-1">
              <div className="card-icon">📍</div>
              <h3>Quick Search</h3>
              <p>Find any location instantly</p>
            </div>
            <div className="visual-card card-2">
              <div className="card-icon">👨‍🏫</div>
              <h3>Faculty Directory</h3>
              <p>Locate professors easily</p>
            </div>
            <div className="visual-card card-3">
              <div className="card-icon">🗺️</div>
              <h3>Offline Access</h3>
              <p>Works without internet</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why College Compass?</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-number">01</div>
              <h3>Simple & Intuitive</h3>
              <p>Clean interface designed for everyone, no technical knowledge required</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-number">02</div>
              <h3>Lightning Fast</h3>
              <p>Database-driven system ensures instant search results</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-number">03</div>
              <h3>Eco-Friendly</h3>
              <p>Offline functionality reduces network dependency and energy consumption</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-number">04</div>
              <h3>Privacy First</h3>
              <p>No location tracking or camera access needed</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-number">05</div>
              <h3>Budget Conscious</h3>
              <p>Low-cost solution without expensive hardware requirements</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-number">06</div>
              <h3>Highly Scalable</h3>
              <p>Easy to implement in other institutions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
