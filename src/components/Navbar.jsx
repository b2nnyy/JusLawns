import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { businessInfo } from '../data/siteData';
import logoImg from '/juslawns-logo-white.png?url';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services & Pricing', to: '/services-pricing' },
  { label: 'Book a Service', to: '/book' },
  { label: 'Service Area', to: '/service-area' },
  { label: 'Contact / Quote', to: '/contact-quote' },
];

export default function Navbar({ openModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <img src={logoImg} alt="JusLawns" className="navbar__logo-img" />
          Jus<span>Lawns</span>
        </Link>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => (isActive ? 'navbar__link navbar__link--active' : 'navbar__link')}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar__right">
          <button className="navbar__quote btn btn-gold" onClick={openModal}>
            Get My Quote
          </button>
          <a href={`tel:${businessInfo.phone}`} className="navbar__phone btn btn-gold">
            <FiPhone size={14} />
            {businessInfo.phone}
          </a>
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <div className={`navbar__mobile${mobileOpen ? ' navbar__mobile--open' : ''}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            onClick={handleNavClick}
            className={({ isActive }) => (isActive ? 'navbar__mobile-link navbar__mobile-link--active' : 'navbar__mobile-link')}
          >
            {link.label}
          </NavLink>
        ))}
        <button className="btn btn-gold" onClick={() => { handleNavClick(); openModal(); }}>
          Get My Free Quote
        </button>
        <a href={`tel:${businessInfo.phone}`} className="btn btn-outline" onClick={handleNavClick}>
          <FiPhone size={14} /> Call Now
        </a>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(26, 58, 31, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          height: var(--nav-height);
          transition: box-shadow 0.3s ease;
        }
        .navbar--scrolled {
          box-shadow: 0 2px 24px rgba(0, 0, 0, 0.18);
        }
        .navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }
        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
        }
        .navbar__logo-img {
          height: 46px;
          width: auto;
        }
        .navbar__logo span {
          color: var(--gold);
        }
        .navbar__links {
          display: flex;
          gap: 32px;
        }
        .navbar__link {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        .navbar__link:hover,
        .navbar__link--active {
          color: var(--gold-light);
        }
        .navbar__right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .navbar__quote {
          padding: 10px 18px;
          font-size: 0.85rem;
        }
        .navbar__phone {
          padding: 10px 20px;
          font-size: 0.85rem;
          border-radius: 100px;
          text-decoration: none;
          background: transparent;
          color: #fff;
          border-color: rgba(255, 255, 255, 0.2);
        }
        .navbar__phone:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.35);
          box-shadow: none;
        }
        .navbar__hamburger {
          display: none;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 4px;
        }
        .navbar__mobile {
          display: none;
          position: fixed;
          top: var(--nav-height);
          left: 0;
          right: 0;
          background: var(--green-dark);
          padding: 24px;
          flex-direction: column;
          gap: 16px;
          transform: translateY(-10px);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.3s ease, opacity 0.3s ease;
          max-height: calc(100vh - var(--nav-height));
          overflow-y: auto;
        }
        .navbar__mobile--open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        .navbar__mobile-link {
          color: rgba(255, 255, 255, 0.85);
          font-size: 1.05rem;
          font-weight: 500;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          text-decoration: none;
        }
        .navbar__mobile-link--active {
          color: var(--gold-light);
        }
        .navbar__mobile .btn {
          margin-top: 8px;
          text-align: center;
        }

        @media (max-width: 900px) {
          .navbar__links {
            display: none;
          }
          .navbar__phone {
            display: none;
          }
          .navbar__quote {
            display: none;
          }
          .navbar__hamburger {
            display: block;
          }
          .navbar__mobile {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
}
