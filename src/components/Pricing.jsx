import { useState } from 'react';
import { recurringPricing, oneTimePricing, binPricing, plans } from '../data/siteData';
import { FiCheck, FiUsers, FiArrowRight } from 'react-icons/fi';

const tabs = ['Recurring Mowing', 'One-Time Services', 'Monthly Plans', 'Trash Bin Sanitation'];

const labelToDropdown = {
  'Leaf Cleanup': 'Leaf Cleanup',
  'Flower Bed Cleanup': 'Flower Bed Cleanup',
  'Mulch Installation': 'Mulch Installation',
  'Gutter Cleaning': 'Gutter Cleaning',
  'Walkway/Driveway Pressure Washing': 'Power Washing / Pressure Washing',
  'Soft Wash (House Exterior)': 'Soft Wash (House Exterior)',
};

function PriceTable({ rows, openModal }) {
  return (
    <div className="pricing__table-wrap">
      <table className="pricing__table">
        <thead>
          <tr><th>Service</th><th>Price</th></tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isEstimate = row.price === 'Get Estimate';
            return (
              <tr key={i} className={isEstimate ? 'pricing__table-row--estimate' : ''}>
                <td>{row.label}</td>
                <td className="pricing__table-price">
                  {isEstimate ? (
                    <button
                      className="pricing__estimate-btn"
                      onClick={() => openModal(labelToDropdown[row.label] || row.label)}
                    >
                      Get Estimate <FiArrowRight size={14} />
                    </button>
                  ) : (
                    row.price
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function PlanCards({ openModal }) {
  return (
    <>
      <div className="pricing__plans">
        {plans.map((plan, i) => (
          <div key={i} className={`pricing__plan${plan.featured ? ' pricing__plan--featured' : ''}`}>
            {plan.badge && <span className="pricing__plan-badge">{plan.badge}</span>}
            <h3>{plan.name}</h3>
            <div className="pricing__plan-price">
              <span className="pricing__plan-label">Starting at</span>
              <span className="pricing__plan-amount">{plan.price}</span>
              <span className="pricing__plan-suffix">/month</span>
            </div>
            <p className="pricing__plan-note">
              Final monthly pricing varies by property size and service needs.
            </p>
            <ul>
              {plan.features.map((feat, j) => (
                <li key={j}><FiCheck size={16} /> {feat}</li>
              ))}
            </ul>
            <button
              className={`btn ${plan.featured ? 'btn-gold' : 'btn-outline'}`}
              onClick={openModal}
            >
              Get My Quote
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default function Pricing({ openModal }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="pricing section-padding" id="pricing">
      <div className="container">
        <p className="section-label section-label--light">Pricing</p>
        <h2 className="pricing__h2">Clear Pricing That Helps You Decide Fast</h2>
        <p className="pricing__sub">
          See your options, compare plans, and request a quote without waiting around for hidden pricing.
        </p>

        <div className="pricing__tabs">
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={`pricing__tab${activeTab === i ? ' pricing__tab--active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="pricing__panel">
          {activeTab === 0 && <PriceTable rows={recurringPricing} openModal={openModal} />}
          {activeTab === 1 && <PriceTable rows={oneTimePricing} openModal={openModal} />}
          {activeTab === 2 && <PlanCards openModal={openModal} />}
          {activeTab === 3 && <PriceTable rows={binPricing} openModal={openModal} />}
        </div>

        <div className="pricing__discount">
          <span className="pricing__discount-icon"><FiUsers size={24} /></span>
          <div>
            <h3>Neighborhood Block Discount</h3>
            <p>
              <strong>3 homes</strong> on the same block: <span className="text-gold">$5 off</span> per property per visit
              &nbsp;·&nbsp;
              <strong>5 homes</strong>: <span className="text-gold">$7 off</span> per property
              &nbsp;·&nbsp;
              <strong>8+ homes</strong>: <span className="text-gold">Custom rate</span>
            </p>
            <p className="pricing__discount-note">Applies to recurring weekly service only.</p>
          </div>
        </div>
      </div>

      <style>{`
        .pricing {
          background: var(--green-dark);
        }
        .pricing__h2 {
          color: #fff;
        }
        .pricing__sub {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.05rem;
          margin-top: 12px;
          margin-bottom: 36px;
          max-width: 500px;
        }
        .pricing__tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .pricing__tab {
          padding: 10px 22px;
          border-radius: var(--radius);
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: transparent;
          color: rgba(255, 255, 255, 0.7);
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pricing__tab--active {
          background: var(--gold);
          color: var(--green-dark);
          border-color: var(--gold);
          font-weight: 600;
        }
        .pricing__tab:hover:not(.pricing__tab--active) {
          border-color: rgba(255, 255, 255, 0.4);
          color: #fff;
        }

        /* Table */
        .pricing__table-wrap {
          overflow-x: auto;
        }
        .pricing__table {
          width: 100%;
          border-collapse: collapse;
        }
        .pricing__table th {
          text-align: left;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .pricing__table th:last-child {
          text-align: right;
        }
        .pricing__table td {
          padding: 16px;
          color: rgba(255, 255, 255, 0.85);
          font-size: 0.95rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .pricing__table tr:hover td {
          background: rgba(255, 255, 255, 0.04);
        }
        .pricing__table-price {
          text-align: right;
          font-family: var(--font-display);
          font-weight: 700;
          color: var(--gold-light);
        }

        /* Get Estimate button */
        .pricing__table-row--estimate {
          cursor: pointer;
        }
        .pricing__estimate-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: 1px solid var(--gold);
          color: var(--gold-light);
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 600;
          padding: 6px 16px;
          border-radius: var(--radius);
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .pricing__estimate-btn:hover {
          background: var(--gold);
          color: var(--green-dark);
        }

        /* Plan Cards */
        .pricing__plans {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .pricing__plan {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-lg);
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .pricing__plan--featured {
          border-color: var(--gold);
          background: rgba(201, 168, 76, 0.08);
        }
        .pricing__plan-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--gold);
          color: var(--green-dark);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 16px;
          border-radius: 100px;
          white-space: nowrap;
        }
        .pricing__plan h3 {
          color: #fff;
          font-size: 1.2rem;
          margin-bottom: 8px;
        }
        .pricing__plan-price {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 24px;
        }
        .pricing__plan-label {
          display: block;
          width: 100%;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
        }
        .pricing__plan-amount {
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 900;
          color: #fff;
        }
        .pricing__plan-suffix {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.5);
        }
        .pricing__plan-note {
          margin-bottom: 20px;
          font-size: 0.8rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.5);
        }
        .pricing__plan ul {
          flex: 1;
          margin-bottom: 24px;
        }
        .pricing__plan li {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.75);
          font-size: 0.9rem;
          padding: 6px 0;
        }
        .pricing__plan li svg {
          color: var(--green-bright);
          flex-shrink: 0;
        }
        .pricing__plan .btn {
          width: 100%;
        }

        /* Block Discount */
        .pricing__discount {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-top: 48px;
          padding: 24px;
          border: 1px solid rgba(201, 168, 76, 0.25);
          border-radius: var(--radius-lg);
          background: rgba(201, 168, 76, 0.06);
        }
        .pricing__discount-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }
        .pricing__discount h3 {
          color: var(--gold-light);
          font-size: 1.1rem;
          margin-bottom: 8px;
        }
        .pricing__discount p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          line-height: 1.7;
        }
        .pricing__discount-note {
          margin-top: 8px;
          font-size: 0.8rem !important;
          color: rgba(255, 255, 255, 0.4) !important;
        }

        @media (max-width: 900px) {
          .pricing__plans {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
        }
        @media (max-width: 640px) {
          .pricing__tabs {
            gap: 6px;
          }
          .pricing__tab {
            padding: 8px 14px;
            font-size: 0.82rem;
          }
          .pricing__discount {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}
