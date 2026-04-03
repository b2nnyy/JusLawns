import { services } from '../data/siteData';
import {
  FiScissors, FiHome, FiDroplet, FiTrash2, FiWind, FiLayers,
} from 'react-icons/fi';
import { LuTreeDeciduous, LuSprout } from 'react-icons/lu';

const iconMap = {
  mowing: LuSprout,
  scissors: FiScissors,
  tree: LuTreeDeciduous,
  layers: FiLayers,
  wind: FiWind,
  home: FiHome,
  droplet: FiDroplet,
  trash: FiTrash2,
};

export default function Services() {
  return (
    <section className="services section-padding" id="services">
      <div className="container">
        <p className="section-label">What We Do</p>
        <h2>Professional Lawn &amp; Property Care</h2>
        <p className="services__sub">
          From routine mowing to deep seasonal cleanups, we keep your property looking
          its best — no shortcuts, no missed visits.
        </p>

        <div className="services__grid">
          {services.map((svc, i) => {
            const Icon = iconMap[svc.icon];
            return (
              <div key={i} className="services__card">
                <div className="services__accent" />
                <span className="services__icon">{Icon && <Icon size={28} />}</span>
                <h3>{svc.title}</h3>
                <p>{svc.description}</p>
                <span className="services__price">{svc.price}</span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .services {
          background: var(--warm-white);
        }
        .services__sub {
          font-size: 1.05rem;
          color: var(--text-muted);
          max-width: 560px;
          margin-top: 12px;
          margin-bottom: 48px;
        }
        .services__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }
        .services__card {
          position: relative;
          background: var(--cream);
          border: 1px solid var(--sand);
          border-radius: var(--radius-lg);
          padding: 28px 24px;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .services__card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow);
        }
        .services__accent {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--green-accent);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.35s ease;
        }
        .services__card:hover .services__accent {
          transform: scaleY(1);
        }
        .services__icon {
          font-size: 1.8rem;
          display: block;
          margin-bottom: 12px;
        }
        .services__card h3 {
          font-size: 1.15rem;
          margin-bottom: 8px;
        }
        .services__card p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .services__price {
          display: inline-block;
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--green-accent);
          background: rgba(74, 140, 82, 0.1);
          padding: 4px 12px;
          border-radius: var(--radius);
        }
      `}</style>
    </section>
  );
}
