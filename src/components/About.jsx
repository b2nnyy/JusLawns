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
      <div className="container about__inner">
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

      <style>{`
        .about {
          background: var(--cream);
        }
        .about__inner {
          max-width: 720px;
          margin: 0 auto;
        }
        .about__inner h2 {
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

        @media (max-width: 640px) {
          .about__values {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
