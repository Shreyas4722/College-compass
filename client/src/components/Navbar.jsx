import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const links = [['/', 'Home'], ['/search', 'Search'], ['/navigate', 'Navigate'], ['/faculty', 'Faculty'], ['/about', 'About']];
  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-brand">
          <span className="brand-mark">◈</span>
          College<strong>Compass</strong>
        </Link>
        <nav className={`nav-links${open ? ' open' : ''}`}>
          {links.map(([path, label]) => (
            <NavLink key={path} to={path} end={path === '/'} className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
