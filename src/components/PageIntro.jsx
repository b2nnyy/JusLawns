import { Link } from 'react-router-dom';

export default function PageIntro({
  label,
  title,
  description,
  primaryLabel,
  onPrimaryAction,
  optionalLabel,
  onOptionalAction,
  secondaryLabel,
  secondaryTo,
}) {
  return (
    <section className="page-intro">
      <div className="page-intro__backdrop" />
      <div className="container page-intro__inner">
        {label ? <p className="section-label section-label--light">{label}</p> : null}
        <h1 className="page-intro__title">{title}</h1>
        <p className="page-intro__description">{description}</p>
        <div className="page-intro__actions">
          {primaryLabel && (
            <button type="button" className="btn btn-gold" onClick={onPrimaryAction}>
              {primaryLabel}
            </button>
          )}
          {optionalLabel && onOptionalAction && (
            <button type="button" className="btn btn-outline" onClick={onOptionalAction}>
              {optionalLabel}
            </button>
          )}
          {secondaryLabel && secondaryTo && (
            <Link className="btn btn-outline" to={secondaryTo}>
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>

      <style>{`
        .page-intro {
          position: relative;
          overflow: hidden;
          background: var(--green-dark);
          padding: calc(var(--nav-height) + 72px) 0 72px;
        }
        .page-intro__backdrop {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 18% 40%, rgba(74, 140, 82, 0.22) 0%, transparent 55%),
            radial-gradient(ellipse at 82% 50%, rgba(201, 168, 76, 0.16) 0%, transparent 55%);
        }
        .page-intro__inner {
          position: relative;
          max-width: 720px;
        }
        .page-intro__title {
          color: #fff;
          margin-bottom: 16px;
        }
        .page-intro__description {
          max-width: 620px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 1.05rem;
          line-height: 1.75;
        }
        .page-intro__actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 32px;
        }
        @media (max-width: 640px) {
          .page-intro {
            padding: calc(var(--nav-height) + 56px) 0 56px;
          }
          .page-intro__actions {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
