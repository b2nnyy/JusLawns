import { whyUs } from '../data/siteData';

export default function WhyUs() {
  return (
    <section className="why-us section-padding" id="why-us">
      <div className="container">
        <p className="section-label">Why Choose Us</p>
        <h2>What Sets Jus Lawns Apart</h2>
        <p className="why-us__sub">
          We built this business on doing the right thing every visit —
          showing up on time, doing quality work, and making it easy for you.
        </p>

        <div className="why-us__grid">
          {whyUs.map((item, i) => (
            <div key={i} className="why-us__card">
              <span className="why-us__num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-us {
          background: var(--warm-white);
        }
        .why-us__sub {
          color: var(--text-muted);
          font-size: 1.05rem;
          max-width: 520px;
          margin-top: 12px;
          margin-bottom: 48px;
        }
        .why-us__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .why-us__card {
          background: var(--cream);
          border: 1px solid var(--sand);
          border-radius: var(--radius-lg);
          padding: 32px 24px;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .why-us__card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow);
        }
        .why-us__num {
          font-family: var(--font-display);
          font-size: 3.5rem;
          font-weight: 900;
          color: rgba(74, 140, 82, 0.1);
          line-height: 1;
          margin-bottom: 12px;
          display: block;
        }
        .why-us__card h3 {
          font-size: 1.1rem;
          margin-bottom: 8px;
        }
        .why-us__card p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .why-us__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .why-us__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
