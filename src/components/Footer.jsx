import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiPhone, FiMail } from 'react-icons/fi';
import { businessInfo } from '../data/siteData';

const serviceLinks = [
  'Lawn Mowing', 'Edging & Trimming', 'Hedge Trimming', 'Mulching',
  'Seasonal Cleanup', 'Gutter Cleaning', 'Power Washing', 'Bin Sanitation',
];

const companyLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services & Pricing', to: '/book' },
  { label: 'Service Area', to: '/service-area' },
  { label: 'Contact / Quote', to: '/contact-quote' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            Jus <span>Lawns</span>
          </Link>
          <p className="footer__tagline">{businessInfo.slogan}</p>
          <div className="footer__social">
            {/* REPLACE: Social media — update footer FB/IG href links with actual profile URLs */}
            <a href="#" aria-label="Facebook"><FiFacebook size={18} /></a>
            <a href="#" aria-label="Instagram"><FiInstagram size={18} /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <ul>
            {serviceLinks.map((s, i) => (
              <li key={i}><Link to="/book">{s}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <ul>
            {companyLinks.map((link, i) => (
              <li key={i}><Link to={link.to}>{link.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul>
            <li>
              <a href={`tel:${businessInfo.phone}`}>
                <FiPhone size={14} /> {businessInfo.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${businessInfo.email}`}>
                <FiMail size={14} /> {businessInfo.email}
              </a>
            </li>
            <li>{businessInfo.legalName}</li>
            <li>{businessInfo.addressFull}</li>
            <li>{businessInfo.hours}</li>
            <li>{businessInfo.sundayHours}</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; {year} {businessInfo.name}. All rights reserved.</p>
          <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--charcoal);
          padding: 72px 0 0;
        }
        .footer__grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 40px;
        }
        .footer__logo {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 12px;
        }
        .footer__logo span {
          color: var(--gold);
        }
        .footer__tagline {
          color: rgba(255, 255, 255, 0.45);
          font-size: 0.9rem;
          margin-bottom: 20px;
          font-style: italic;
        }
        .footer__social {
          display: flex;
          gap: 12px;
        }
        .footer__social a {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.2s;
        }
        .footer__social a:hover {
          border-color: var(--gold);
          color: var(--gold);
        }
        .footer__col h4 {
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 16px;
        }
        .footer__col ul {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer__col li,
        .footer__col a {
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }
        .footer__col a:hover {
          color: var(--gold-light);
        }
        .footer__bottom {
          margin-top: 48px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 20px 0;
        }
        .footer__bottom-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer__bottom p {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.35);
        }
        .footer__bottom a {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.35);
          transition: color 0.2s;
        }
        .footer__bottom a:hover {
          color: var(--gold-light);
        }

        @media (max-width: 900px) {
          .footer__grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }
        @media (max-width: 640px) {
          .footer__grid {
            grid-template-columns: 1fr;
          }
          .footer__bottom-inner {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
