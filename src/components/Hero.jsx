import { FiPhone, FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { businessInfo } from '../data/siteData';

export default function Hero({ openModal }) {
  return (
    <section className="hero" id="hero">
      {/* REPLACE: Hero background — swap Unsplash URL with actual lawn photo (recommended: 1800px wide, landscape) */}
      <div className="hero__bg" />
      <div className="hero__overlay" />
      <div className="hero__fade" />

      <div className="hero__content container">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Now Serving Philadelphia &amp; Surrounding Neighborhoods
        </div>

        <p className="hero__eyebrow">JusLawns</p>

        <h1 className="hero__h1">
          Curb Appeal<br />
          <span className="hero__h1-accent">Made Easy.</span>
        </h1>

        <p className="hero__sub">
          Reliable, professional lawn care that keeps your property clean,
          sharp, and maintained all season long.
        </p>

        <div className="hero__buttons">
          <Link to="/book" className="btn btn-gold">
            <FiCalendar size={16} /> Book Now
          </Link>
          <button className="btn btn-outline" onClick={openModal}>
            Get My Free Quote
          </button>
          <a href={`tel:${businessInfo.phone}`} className="btn btn-outline">
            <FiPhone size={16} /> Call Now
          </a>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <strong>8+</strong>
            <span>Services</span>
          </div>
          <div className="hero__stat">
            <strong>20+</strong>
            <span>Neighborhoods</span>
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero__bg {
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1560749003-f4b1e17e2dff?w=1800&q=80') center/cover no-repeat;
        }
        .hero__overlay {
          position: absolute;
          inset: 0;
          background: rgba(26, 58, 31, 0.88);
        }
        .hero__fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 200px;
          background: linear-gradient(to bottom, transparent, var(--warm-white));
          z-index: 1;
        }
        .hero__content {
          position: relative;
          z-index: 2;
          max-width: 720px;
          padding-top: calc(var(--nav-height) + 60px);
          padding-bottom: 80px;
        }
        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(106, 184, 112, 0.15);
          border: 1px solid rgba(106, 184, 112, 0.3);
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--green-bright);
          margin-bottom: 28px;
        }
        .hero__badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--green-bright);
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        .hero__eyebrow {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 16px;
        }
        .hero__h1 {
          color: #fff;
          margin-bottom: 24px;
          line-height: 1.08;
        }
        .hero__h1-accent {
          font-style: italic;
          color: var(--gold-light);
        }
        .hero__sub {
          font-size: 1.15rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
          max-width: 540px;
          margin-bottom: 36px;
        }
        .hero__buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 60px;
        }
        .hero__stats {
          display: flex;
          gap: 48px;
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }
        .hero__stat {
          display: flex;
          flex-direction: column;
        }
        .hero__stat strong {
          font-family: var(--font-display);
          font-size: 1.6rem;
          color: #fff;
        }
        .hero__stat span {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 2px;
        }

        @media (max-width: 640px) {
          .hero__content {
            padding-top: calc(var(--nav-height) + 40px);
          }
          .hero__stats {
            gap: 32px;
          }
          .hero__buttons {
            flex-direction: column;
          }
          .hero__buttons .btn {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
