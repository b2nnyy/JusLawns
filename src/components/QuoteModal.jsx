import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { businessInfo, serviceDropdownOptions } from '../data/siteData';

export default function QuoteModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
    }
  }, [isOpen]);

  // REPLACE: Formspree — create account at formspree.io and replace YOUR_FORM_ID
  const FORMSPREE_ID = 'YOUR_FORM_ID';
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
        if (res.ok) setSubmitted(true);
      } catch {
        window.location.href = `mailto:${businessInfo.email}?subject=Quote Request`;
      }
    } else {
      window.location.href = `mailto:${businessInfo.email}?subject=Quote Request`;
    }
    setSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <FiX size={20} />
        </button>

        {submitted ? (
          <div className="modal-success">
            <span>✅</span>
            <h3>Quote Request Sent!</h3>
            <p>We'll get back to you shortly with a free estimate. Thank you!</p>
            <button className="btn btn-gold" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h3 className="modal-title">Get a Free Quote</h3>
            <p className="modal-subtitle">
              Fill out the form and we'll respond with a custom quote for your property.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="m-name">Full Name</label>
                  <input type="text" id="m-name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="m-phone">Phone</label>
                  <input type="tel" id="m-phone" name="phone" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="m-email">Email</label>
                <input type="email" id="m-email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="m-address">Property Address</label>
                <input type="text" id="m-address" name="address" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="m-service">Service Needed</label>
                  <select id="m-service" name="service">
                    <option value="">Select a service...</option>
                    {serviceDropdownOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="m-date">Preferred Date</label>
                  <input type="date" id="m-date" name="date" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="m-message">Message</label>
                <textarea id="m-message" name="message" rows="3" />
              </div>
              <button type="submit" className="btn btn-gold modal-submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send My Quote Request →'}
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: modalFadeIn 0.25s ease;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-card {
          background: #fff;
          border-radius: var(--radius-lg);
          padding: 36px 32px;
          max-width: 560px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: modalSlideUp 0.3s ease;
        }
        @keyframes modalSlideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          padding: 4px;
          transition: color 0.2s;
        }
        .modal-close:hover {
          color: var(--charcoal);
        }
        .modal-title {
          font-size: 1.3rem;
          margin-bottom: 8px;
        }
        .modal-subtitle {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 24px;
        }
        .modal-card form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .modal-submit {
          width: 100%;
          margin-top: 8px;
        }
        .modal-success {
          text-align: center;
          padding: 40px 20px;
        }
        .modal-success span {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 16px;
        }
        .modal-success h3 {
          color: var(--green-accent);
          margin-bottom: 8px;
        }
        .modal-success p {
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        @media (max-width: 640px) {
          .modal-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </div>
  );
}
