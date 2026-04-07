import { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';
import {
  FiCheck, FiArrowRight, FiArrowLeft, FiCreditCard, FiDollarSign,
  FiAlertTriangle, FiX, FiLoader,
} from 'react-icons/fi';
import { LuSprout, LuTreeDeciduous } from 'react-icons/lu';
import { FiScissors } from 'react-icons/fi';
import './BookService.css';

// TODO: Future — restrict available booking days based on customer zip code
// (e.g. Northeast Philly zip codes → Mondays only)

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbziCpVn8XV1DB-jZUMeBKNaK2ysZm4d5DnNIw3VsVxGcC5yS9XamEaHKv9CPagzo74Y/exec';

const BOOKABLE_SERVICES = [
  { id: 'recurring', label: 'Recurring Lawn Mowing', desc: 'Weekly or biweekly mowing, edging, and cleanup', icon: LuSprout },
  { id: 'one-time', label: 'One-Time Lawn Cut', desc: 'Single visit mow, edge, trim, and blow', icon: LuSprout },
  { id: 'overgrown', label: 'Overgrown Lawn Recovery', desc: 'Heavy-duty cut for neglected or overgrown yards', icon: LuTreeDeciduous },
  { id: 'hedge', label: 'Hedge Trimming', desc: 'Shape and trim hedges and shrubs', icon: FiScissors },
];

function toDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function StepIndicator({ current, steps }) {
  return (
    <div className="book__steps">
      {steps.map((label, i) => (
        <div key={i} className={`book__step ${i < current ? 'book__step--done' : ''} ${i === current ? 'book__step--active' : ''}`}>
          <span className="book__step-num">
            {i < current ? <FiCheck size={14} /> : i + 1}
          </span>
          <span className="book__step-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

function CashDisclaimerModal({ onAccept, onCancel }) {
  return (
    <div className="book__modal-overlay" onClick={onCancel}>
      <div className="book__modal" onClick={(e) => e.stopPropagation()}>
        <button className="book__modal-close" onClick={onCancel} aria-label="Close">
          <FiX size={20} />
        </button>
        <FiAlertTriangle size={40} color="var(--gold)" />
        <h3>Cash Payment Notice</h3>
        <p>
          Cash payment must be collected the day before your scheduled service. A Jus Lawns
          team member will contact you to coordinate pickup. If payment is not received the
          day before, your booking will be automatically cancelled.
        </p>
        <div className="book__modal-actions">
          <button className="btn btn-gold" onClick={onAccept}>
            I Understand
          </button>
          <button className="btn btn-outline--dark" onClick={onCancel}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookService() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showCashModal, setShowCashModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [confirmationId, setConfirmationId] = useState('');
  const [slotCache, setSlotCache] = useState({});
  const [info, setInfo] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    street: '', city: '', zip: '', notes: '',
    termsAccepted: false,
  });

  const steps = ['Service', 'Date', 'Your Info', 'Payment', 'Confirmation'];

  const fetchSlots = useCallback(async (date) => {
    const key = toDateStr(date);
    if (slotCache[key] !== undefined) return;
    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?date=${key}`);
      const data = await res.json();
      setSlotCache((prev) => ({ ...prev, [key]: data.remaining ?? 12 }));
    } catch {
      setSlotCache((prev) => ({ ...prev, [key]: 12 }));
    }
  }, [slotCache]);

  const getRemaining = (date) => {
    const key = toDateStr(date);
    return slotCache[key] ?? 12;
  };

  useEffect(() => {
    if (step === 1) {
      const today = new Date();
      for (let i = 0; i < 30; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() + i);
        fetchSlots(d);
      }
    }
  }, [step]);

  const submitBooking = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const payload = {
        date: toDateStr(selectedDate),
        service: service.label,
        firstName: info.firstName,
        lastName: info.lastName,
        phone: info.phone,
        email: info.email,
        street: info.street,
        city: info.city,
        zip: info.zip,
        notes: info.notes,
        paymentMethod: paymentMethod,
      };
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setConfirmationId(data.confirmationId);
        const key = toDateStr(selectedDate);
        setSlotCache((prev) => ({ ...prev, [key]: data.remaining ?? (prev[key] - 1) }));
        setStep(4);
      } else {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Could not connect to booking system. Please try again.');
    }
    setSubmitting(false);
  };

  const canProceed = () => {
    switch (step) {
      case 0: return !!service;
      case 1: return !!selectedDate;
      case 2: return info.firstName && info.lastName && info.phone && info.email && info.street && info.city && info.zip && info.termsAccepted;
      case 3: return !!paymentMethod && !submitting;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step === 3) {
      if (paymentMethod === 'cash' && !showCashModal) {
        setShowCashModal(true);
        return;
      }
      submitBooking();
      return;
    }
    setStep((s) => s + 1);
  };

  const handleCashAccept = () => {
    setShowCashModal(false);
    submitBooking();
  };

  const tileDisabled = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || getRemaining(date) <= 0;
  };

  const tileContent = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return null;
    const remaining = getRemaining(date);
    const key = toDateStr(date);
    const loaded = slotCache[key] !== undefined;
    return (
      <span className={`book__slot-count ${remaining <= 3 ? 'book__slot-count--low' : ''}`}>
        {loaded ? `${remaining} left` : '...'}
      </span>
    );
  };

  const handleInfoChange = (field) => (e) => {
    const value = field === 'termsAccepted' ? e.target.checked : e.target.value;
    setInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="book section-padding">
      <div className="container book__container">
        <h1 className="book__title">Book a Service</h1>
        <StepIndicator current={step} steps={steps} />

        <div className="book__panel">
          {step === 0 && (
            <div className="book__services">
              <h2>Select a Service</h2>
              <p className="book__hint">Choose the service you'd like to book online.</p>
              <div className="book__service-grid">
                {BOOKABLE_SERVICES.map((svc) => {
                  const Icon = svc.icon;
                  return (
                    <button
                      key={svc.id}
                      className={`book__service-card ${service?.id === svc.id ? 'book__service-card--selected' : ''}`}
                      onClick={() => setService(svc)}
                    >
                      <Icon size={28} />
                      <strong>{svc.label}</strong>
                      <span>{svc.desc}</span>
                    </button>
                  );
                })}
              </div>
              <p className="book__other-note">
                Need a different service?{' '}
                <Link to="/contact-quote">Request a free estimate</Link> instead.
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="book__date">
              <h2>Select a Date</h2>
              <p className="book__disclaimer">
                Your service will be completed anytime between <strong>7:00 AM &ndash; 5:00 PM</strong> on
                your selected date. You do not need to be home.
              </p>
              <div className="book__calendar-wrap">
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  tileDisabled={tileDisabled}
                  tileContent={tileContent}
                  minDate={new Date()}
                  locale="en-US"
                />
              </div>
              {selectedDate && (
                <p className="book__selected-date">
                  Selected: <strong>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                  &nbsp;&mdash;&nbsp;{getRemaining(selectedDate)} slots remaining
                </p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="book__info">
              <h2>Your Information</h2>
              <p className="book__hint">No account required — just fill in your details.</p>
              <div className="book__form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input type="text" value={info.firstName} onChange={handleInfoChange('firstName')} required />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input type="text" value={info.lastName} onChange={handleInfoChange('lastName')} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone *</label>
                    <input type="tel" value={info.phone} onChange={handleInfoChange('phone')} required />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" value={info.email} onChange={handleInfoChange('email')} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Street Address *</label>
                  <input type="text" value={info.street} onChange={handleInfoChange('street')} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input type="text" value={info.city} onChange={handleInfoChange('city')} required />
                  </div>
                  <div className="form-group">
                    <label>Zip Code *</label>
                    <input type="text" value={info.zip} onChange={handleInfoChange('zip')} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Notes / Access Instructions</label>
                  <textarea value={info.notes} onChange={handleInfoChange('notes')} rows="3" />
                </div>
                <label className="book__checkbox">
                  <input type="checkbox" checked={info.termsAccepted} onChange={handleInfoChange('termsAccepted')} />
                  <span>
                    I agree to the <Link to="/terms" target="_blank">Terms & Conditions</Link> and{' '}
                    <Link to="/privacy" target="_blank">Privacy Policy</Link>
                  </span>
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="book__payment">
              <h2>Payment Method</h2>
              <p className="book__hint">Choose how you'd like to pay for your service.</p>
              <div className="book__payment-options">
                <button
                  className={`book__payment-card ${paymentMethod === 'online' ? 'book__payment-card--selected' : ''}`}
                  onClick={() => setPaymentMethod('online')}
                >
                  <FiCreditCard size={28} />
                  <strong>Pay Online</strong>
                  {/* TODO: Integrate Square or Stripe payment processing here */}
                  <span>Credit or debit card — payment integration coming soon</span>
                </button>
                <button
                  className={`book__payment-card ${paymentMethod === 'cash' ? 'book__payment-card--selected' : ''}`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <FiDollarSign size={28} />
                  <strong>Pay with Cash</strong>
                  <span>Cash collected the day before your service</span>
                </button>
              </div>
              {submitError && (
                <p className="book__error">{submitError}</p>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="book__confirm">
              <FiCheck size={48} className="book__confirm-icon" />
              <h2>{paymentMethod === 'cash' ? 'Booking Submitted — Pending Cash Payment' : 'Booking Confirmed!'}</h2>
              <p className="book__confirm-id">Confirmation: <strong>{confirmationId}</strong></p>
              {/* TODO: Returning customer re-booking — allow repeat customers to re-book a saved service (may require account system in v2) */}
              <div className="book__confirm-summary">
                <div className="book__confirm-row">
                  <span>Service</span><strong>{service?.label}</strong>
                </div>
                <div className="book__confirm-row">
                  <span>Date</span><strong>{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                </div>
                <div className="book__confirm-row">
                  <span>Time</span><strong>Between 7:00 AM &ndash; 5:00 PM</strong>
                </div>
                <div className="book__confirm-row">
                  <span>Customer</span><strong>{info.firstName} {info.lastName}</strong>
                </div>
                <div className="book__confirm-row">
                  <span>Address</span><strong>{info.street}, {info.city} {info.zip}</strong>
                </div>
                <div className="book__confirm-row">
                  <span>Payment</span><strong>{paymentMethod === 'cash' ? 'Cash (pending collection)' : 'Online (coming soon)'}</strong>
                </div>
              </div>
              {paymentMethod === 'cash' && (
                <p className="book__confirm-cash-note">
                  A team member will contact you to arrange cash pickup the day before your service.
                  If payment is not received, your booking will be automatically cancelled.
                </p>
              )}
              <Link to="/" className="btn btn-gold">Back to Home</Link>
            </div>
          )}
        </div>

        {step < 4 && (
          <div className="book__nav">
            {step > 0 && (
              <button className="btn btn-outline--dark" onClick={() => setStep((s) => s - 1)}>
                <FiArrowLeft size={16} /> Back
              </button>
            )}
            <button
              className="btn btn-gold"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {submitting ? (
                <><FiLoader size={16} className="book__spinner" /> Submitting...</>
              ) : (
                <>{step === 3 ? 'Confirm Booking' : 'Continue'} <FiArrowRight size={16} /></>
              )}
            </button>
          </div>
        )}
      </div>

      {showCashModal && (
        <CashDisclaimerModal
          onAccept={handleCashAccept}
          onCancel={() => setShowCashModal(false)}
        />
      )}
    </section>
  );
}
