export default function Referral({ openModal }) {
  return (
    <section className="referral" id="referral">
      <div className="container referral__inner">
        <div className="referral__text">
          <p className="section-label section-label--light">Referral Program</p>
          <h2 className="referral__h2">Share the Love, Save on&nbsp;Your&nbsp;Bill</h2>
          <p className="referral__body">
            Refer a neighbor or friend and receive <strong>$10 off your next two services</strong> per
            referral. Up to 4 referrals per month — credits may be stacked within
            the monthly limit.
          </p>
        </div>
        <div className="referral__action">
          <button className="btn btn-gold" onClick={openModal}>
            Refer a Neighbor →
          </button>
        </div>
      </div>

      <style>{`
        .referral {
          background: var(--green-mid);
          padding: 72px 0;
        }
        .referral__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }
        .referral__h2 {
          color: #fff;
          margin-bottom: 12px;
        }
        .referral__body {
          color: rgba(255, 255, 255, 0.75);
          font-size: 0.95rem;
          line-height: 1.7;
          max-width: 520px;
        }
        .referral__body strong {
          color: var(--gold-light);
        }
        .referral__action {
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .referral__inner {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }
          .referral__body {
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
