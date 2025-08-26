import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// The NavBar component renders the top navigation bar with links to each page.
// It includes a theme toggle button to switch between light and dark modes by
// toggling a data attribute on the document's root element.
export default function NavBar() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Read stored theme preference from localStorage or default to light.
    const stored = localStorage.getItem('theme');
    return stored === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        <NavLink to="/ai" className={({ isActive }) => (isActive ? 'active' : '')}>AI/ML</NavLink>
        <NavLink to="/data" className={({ isActive }) => (isActive ? 'active' : '')}>Data</NavLink>
        <NavLink to="/web" className={({ isActive }) => (isActive ? 'active' : '')}>Web</NavLink>
        <NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')}>Blog</NavLink>
        <NavLink to="/case-studies" className={({ isActive }) => (isActive ? 'active' : '')}>Case Studies</NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink>
      </div>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </nav>
  );
}