import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiCheckCircle } from 'react-icons/fi';
import { businessInfo, serviceDropdownOptions, appsScriptWebAppUrl } from '../data/siteData';

function splitFullName(full) {
  const trimmed = (full || '').toString().trim();
  const parts = trimmed.split(/\s+/).filter(Boolean);
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ') || '';
  return { firstName, lastName };
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    const form = e.target;
    const fd = new FormData(form);
    const nameRaw = (fd.get('name') || '').toString();
    const { firstName, lastName } = splitFullName(nameRaw);
    const service = (fd.get('service') || '').toString();
    const address = (fd.get('address') || '').toString();
    const message = (fd.get('message') || '').toString();

    const payload = {
      bookingKind: 'contact',
      firstName,
      lastName,
      phone: (fd.get('phone') || '').toString(),
      email: (fd.get('email') || '').toString(),
      street: address,
      city: '',
      zip: '',
      service,
      notes: message,
      paymentMethod: '',
    };

    try {
      const res = await fetch(appsScriptWebAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setConfirmationId(data.confirmationId || '');
        setSubmitted(true);
        form.reset();
      } else {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      window.location.href = `mailto:${businessInfo.email}?subject=${encodeURIComponent('Website contact')}`;
    }
    setSubmitting(false);
  };

  const contactItems = [
    { icon: <FiPhone size={20} />, label: businessInfo.phone, href: `tel:${businessInfo.phone}` },
    { icon: <FiMail size={20} />, label: businessInfo.email, href: `mailto:${businessInfo.email}` },
    { icon: <FiMapPin size={20} />, label: businessInfo.serviceArea, href: null },
    { icon: <FiClock size={20} />, label: `${businessInfo.hours} · ${businessInfo.sundayHours}`, href: null },
  ];

  return (
    <section className="contact" id="contact">
      <div className="container contact__grid">
        <div className="contact__info">
          <p className="section-label">Contact</p>
          <h1 className="contact__page-title">We're here to help</h1>
          <h2>Questions, concerns, or feedback</h2>
          <p className="contact__intro">
            Reach out for billing questions, service issues, general inquiries, or anything else on your mind.
            We read every message and respond as soon as we can.
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
              <h3>Thank you</h3>
              <p>We received your message and will get back to you shortly.</p>
              {confirmationId ? (
                <p className="contact__ref">Reference: <strong>{confirmationId}</strong></p>
              ) : null}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3>Send us a message</h3>
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
                <label htmlFor="c-address">Property address (optional)</label>
                <input type="text" id="c-address" name="address" />
              </div>
              <div className="form-group">
                <label htmlFor="c-service">Topic or service (optional)</label>
                <select id="c-service" name="service" defaultValue="">
                  <option value="">—</option>
                  {serviceDropdownOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="c-message">Message</label>
                <textarea id="c-message" name="message" rows="4" required />
              </div>
              {submitError ? <p className="contact__error" role="alert">{submitError}</p> : null}
              <button type="submit" className="btn btn-gold contact__submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .contact {
          background: var(--cream);
          padding-top: calc(var(--nav-height) + 64px);
          padding-bottom: 100px;
        }
        .contact__page-title {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 4vw, 2.25rem);
          color: var(--charcoal);
          margin: 0 0 16px;
          line-height: 1.2;
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
          margin-bottom: 28px;
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
        .contact__ref {
          margin-top: 12px;
          font-size: 0.9rem;
        }
        .contact__error {
          color: #b42318;
          font-size: 0.9rem;
          margin: 0;
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
