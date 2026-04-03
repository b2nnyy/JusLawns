import { aboutCopy } from '../data/siteData';
import { FiRepeat, FiSearch, FiMessageCircle, FiMapPin } from 'react-icons/fi';

const valueIconMap = {
  repeat: FiRepeat,
  search: FiSearch,
  message: FiMessageCircle,
  pin: FiMapPin,
};

export default function About() {
  return (
    <section className="about section-padding" id="about">
      <div className="container about__grid">
        <div className="about__image-col">
          {/* REPLACE: About section — add team or property photo (recommended: 800x1000px portrait) */}
          <div className="about__image-placeholder">
            <FiMapPin size={48} />
            <p>Team / Lawn Photo</p>
          </div>
          <div className="about__float-card">
            <strong>100%</strong>
            <span>Satisfaction Focused</span>
          </div>
        </div>

        <div className="about__text-col">
          <p className="section-label">About Us</p>
          <h2>Built on Reliability, Driven&nbsp;by&nbsp;Results</h2>

          {aboutCopy.paragraphs.map((p, i) => (
            <p key={i} className="about__para">{p}</p>
          ))}

          <div className="about__values">
            {aboutCopy.values.map((val, i) => {
              const Icon = valueIconMap[val.icon];
              return (
              <div key={i} className="about__value">
                <span className="about__value-icon">{Icon && <Icon size={20} />}</span>
                <div>
                  <strong>{val.title}</strong>
                  <p>{val.body}</p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .about {
          background: var(--cream);
        }
        .about__grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: center;
        }
        .about__image-col {
          position: relative;
        }
        .about__image-placeholder {
          aspect-ratio: 4 / 5;
          background: linear-gradient(135deg, var(--green-mid), var(--green-dark));
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
        }
        .about__image-placeholder span {
          font-size: 3rem;
          margin-bottom: 12px;
        }
        .about__float-card {
          position: absolute;
          bottom: -20px;
          right: -20px;
          background: #fff;
          border-radius: var(--radius-lg);
          padding: 20px 24px;
          box-shadow: var(--shadow-lg);
          text-align: center;
        }
        .about__float-card strong {
          display: block;
          font-family: var(--font-display);
          font-size: 2rem;
          color: var(--green-accent);
        }
        .about__float-card span {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .about__text-col h2 {
          margin-bottom: 20px;
        }
        .about__para {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 12px;
        }
        .about__values {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 32px;
        }
        .about__value {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .about__value-icon {
          font-size: 1.4rem;
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(74, 140, 82, 0.1);
          border-radius: var(--radius);
        }
        .about__value strong {
          display: block;
          font-size: 0.9rem;
          margin-bottom: 2px;
          color: var(--charcoal);
        }
        .about__value p {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .about__grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .about__image-col {
            display: none;
          }
        }
        @media (max-width: 640px) {
          .about__values {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
