import { FiPhone } from 'react-icons/fi';
import { businessInfo } from '../data/siteData';

export default function CTA({ openModal }) {
  return (
    <section className="cta-section" id="cta">
      <div className="cta-section__bg" />
      <div className="container cta-section__inner">
        <h2>Ready for a Cleaner, Sharper&nbsp;Lawn?</h2>
        <p>
          Get a free, no-obligation quote in minutes. Or call us directly
          and we'll get you scheduled.
        </p>
        <div className="cta-section__buttons">
          <button className="btn btn-gold" onClick={openModal}>
            Get My Free Quote
          </button>
          <a href={`tel:${businessInfo.phone}`} className="btn btn-outline">
            <FiPhone size={16} /> Call {businessInfo.phone}
          </a>
        </div>
      </div>

      <style>{`
        .cta-section {
          position: relative;
          background: var(--green-dark);
          padding: 100px 0;
          overflow: hidden;
        }
        .cta-section__bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 20% 50%, rgba(74, 140, 82, 0.25) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 50%, rgba(201, 168, 76, 0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .cta-section__inner {
          position: relative;
          text-align: center;
          max-width: 600px;
        }
        .cta-section__inner h2 {
          color: #fff;
          margin-bottom: 16px;
        }
        .cta-section__inner p {
          color: rgba(255, 255, 255, 0.65);
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 36px;
        }
        .cta-section__buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 640px) {
          .cta-section {
            padding: 72px 0;
          }
          .cta-section__buttons {
            flex-direction: column;
            align-items: center;
          }
          .cta-section__buttons .btn {
            width: 100%;
            max-width: 320px;
          }
        }
      `}</style>
    </section>
  );
}
