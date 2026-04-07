import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiCheckCircle } from 'react-icons/fi';
import { businessInfo, serviceDropdownOptions } from '../data/siteData';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // REPLACE: Formspree — create account at formspree.io and replace YOUR_FORM_ID
  const FORMSPREE_ID = 'mzdkvynr';
  const formspreeReady = FORMSPREE_ID !== 'YOUR_FORM_ID';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (formspreeReady) {
      try {
        const data = new FormData(e.target);
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          setSubmitted(true);
        }
      } catch {
        window.location.href = `mailto:${businessInfo.email}?subject=Quote Request`;
      }
    } else {
      window.location.href = `mailto:${businessInfo.email}?subject=Quote Request`;
    }
    setSubmitting(false);
  };

  const contactItems = [
    { icon: <FiPhone size={20} />, label: businessInfo.phone, href: `tel:${businessInfo.phone}` },
    { icon: <FiMail size={20} />, label: businessInfo.email, href: `mailto:${businessInfo.email}` },
    { icon: <FiMapPin size={20} />, label: 'Philadelphia, PA & Surrounding Neighborhoods', href: null },
    { icon: <FiClock size={20} />, label: `${businessInfo.hours} · ${businessInfo.sundayHours}`, href: null },
  ];

  return (
    <section className="contact section-padding" id="contact">
      <div className="container contact__grid">
        <div className="contact__info">
          <p className="section-label">Get in Touch</p>
          <h2>Let's Talk About Your&nbsp;Property</h2>
          <p className="contact__intro">
            Reach out anytime — we'll get back to you with a free quote,
            usually within a few hours.
          </p>

          <div className="contact__items">
            {contactItems.map((item, i) => (
              <div key={i} className="contact__item">
                <div className="contact__item-icon">{item.icon}</div>
                {item.href ? (
                  <a href={item.href}>{item.label}</a>
                ) : (
                  <span>{item.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="contact__form-card">
          {submitted ? (
            <div className="contact__success">
              <FiCheckCircle size={40} color="var(--green-accent)" />
              <h3>Thank You!</h3>
              <p>We received your quote request and will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3>Request a Free Quote</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="c-name">Full Name</label>
                  <input type="text" id="c-name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="c-phone">Phone</label>
                  <input type="tel" id="c-phone" name="phone" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="c-email">Email</label>
                <input type="email" id="c-email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="c-address">Property Address</label>
                <input type="text" id="c-address" name="address" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="c-service">Service Needed</label>
                  <select id="c-service" name="service" required>
                    <option value="">Select a service...</option>
                    {serviceDropdownOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="c-date">Preferred Date</label>
                  <input type="date" id="c-date" name="date" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="c-message">Message</label>
                <textarea id="c-message" name="message" rows="4" />
              </div>
              <button type="submit" className="btn btn-gold contact__submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send My Quote Request →'}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .contact {
          background: var(--cream);
        }
        .contact__grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: start;
        }
        .contact__info h2 {
          margin-bottom: 16px;
        }
        .contact__intro {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 32px;
        }
        .contact__items {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .contact__item {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .contact__item-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(74, 140, 82, 0.1);
          border-radius: var(--radius);
          color: var(--green-accent);
          flex-shrink: 0;
        }
        .contact__item a {
          color: var(--charcoal);
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s;
        }
        .contact__item a:hover {
          color: var(--green-accent);
        }
        .contact__item span {
          color: var(--text-body);
          font-size: 0.93rem;
        }
        .contact__form-card {
          background: #fff;
          border-radius: var(--radius-lg);
          padding: 36px 32px;
          box-shadow: var(--shadow);
        }
        .contact__form-card h3 {
          font-size: 1.2rem;
          margin-bottom: 24px;
        }
        .contact__form-card form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .contact__submit {
          width: 100%;
          margin-top: 8px;
        }
        .contact__success {
          text-align: center;
          padding: 40px 20px;
        }
        .contact__success span {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 16px;
        }
        .contact__success h3 {
          color: var(--green-accent);
          margin-bottom: 8px;
        }
        .contact__success p {
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .contact__grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
        @media (max-width: 640px) {
          .contact__form-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </section>
  );
}
