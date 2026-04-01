const items = [
  { icon: '✓', text: 'Free Estimates Always' },
  { icon: '🔒', text: 'Secure Online Payments' },
  { icon: '📅', text: 'Weekly & Biweekly Plans' },
  { icon: '⭐', text: 'Consistent, Reliable Service' },
  { icon: '📞', text: 'Mon–Sat, 8AM–6PM' },
];

export default function TrustStrip() {
  return (
    <section className="trust-strip">
      <div className="trust-strip__inner container">
        {items.map((item, i) => (
          <div key={i} className="trust-strip__item">
            <span className="trust-strip__dot">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      <style>{`
        .trust-strip {
          background: var(--cream);
          border-bottom: 1px solid var(--sand);
          padding: 20px 0;
        }
        .trust-strip__inner {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .trust-strip__item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-body);
          padding: 6px 16px;
          border-right: 1px solid var(--sand);
          white-space: nowrap;
        }
        .trust-strip__item:last-child {
          border-right: none;
        }
        .trust-strip__dot {
          font-size: 0.95rem;
        }

        @media (max-width: 900px) {
          .trust-strip__item {
            border-right: none;
            padding: 4px 12px;
          }
        }
        @media (max-width: 640px) {
          .trust-strip__inner {
            gap: 8px;
          }
          .trust-strip__item {
            font-size: 0.8rem;
            padding: 4px 8px;
          }
        }
      `}</style>
    </section>
  );
}
