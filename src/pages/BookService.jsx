import { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';
import {
  FiCheck, FiArrowRight, FiArrowLeft, FiLoader,
  FiLayers, FiWind, FiHome, FiDroplet, FiTrash2, FiScissors,
} from 'react-icons/fi';
import { LuSprout, LuTreeDeciduous } from 'react-icons/lu';
import PageIntro from '../components/PageIntro';
import Pricing from '../components/Pricing';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import FAQ from '../components/FAQ';
import './BookService.css';

// TODO: Future — restrict available booking days based on customer zip code
// (e.g. Northeast Philly zip codes → Mondays only)

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbziCpVn8XV1DB-jZUMeBKNaK2ysZm4d5DnNIw3VsVxGcC5yS9XamEaHKv9CPagzo74Y/exec';

const BOOKABLE_SERVICES = [
  { id: 'recurring', label: 'Recurring Lawn Mowing', desc: 'Weekly or biweekly mowing, edging, and cleanup', icon: LuSprout, price: 'From $40/visit' },
  { id: 'one-time', label: 'One-Time Lawn Cut', desc: 'Single visit mow, edge, trim, and blow', icon: LuSprout, price: 'From $45' },
  { id: 'overgrown', label: 'Overgrown Lawn Recovery', desc: 'Heavy-duty cut for neglected or overgrown yards', icon: LuTreeDeciduous, price: 'From $95' },
  { id: 'hedge', label: 'Hedge Trimming', desc: 'Shape and trim hedges and shrubs', icon: FiScissors, price: 'From $50' },
  { id: 'mulching', label: 'Mulch Installation', desc: 'Fresh mulch for plant beds — locks in moisture and polishes landscaping', icon: FiLayers, price: 'Free Estimate' },
  { id: 'seasonal', label: 'Seasonal Cleanup', desc: 'Spring and fall debris, leaf, and overgrowth removal', icon: FiWind, price: 'Free Estimate' },
  { id: 'gutters', label: 'Gutter Cleaning', desc: 'Clear clogged gutters to protect your home from water damage', icon: FiHome, price: 'Free Estimate' },
  { id: 'powerwash', label: 'Power Washing', desc: 'Blast grime and stains from walkways, driveways, and patios', icon: FiDroplet, price: 'Free Estimate' },
  { id: 'softwash', label: 'Soft Wash (House Exterior)', desc: 'Gentle exterior wash safe for siding, brick, and paint', icon: FiDroplet, price: 'Free Estimate' },
  { id: 'bin', label: 'Trash Bin Sanitation', desc: 'Full rinse, deodorizing, and bacteria removal for your bins', icon: FiTrash2, price: 'From $25/bin' },
  { id: 'basic-plan', label: 'Basic Monthly Plan', desc: 'Weekly mowing, edging, trim, and blow — billed by estimate', icon: LuSprout, price: 'By Estimate' },
  { id: 'standard-plan', label: 'Standard Monthly Plan', desc: 'Mowing, edging, weed control, and priority scheduling', icon: LuSprout, price: 'By Estimate' },
  { id: 'premium-plan', label: 'Premium Monthly Plan', desc: 'Full-service care: mowing, hedges, seasonal cleanup, and more', icon: LuTreeDeciduous, price: 'By Estimate' },
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

export default function BookService({ openModal }) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [confirmationId, setConfirmationId] = useState('');
  const [slotCache, setSlotCache] = useState({});
  const [info, setInfo] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    street: '', city: '', zip: '', notes: '',
    termsAccepted: false,
  });

  const steps = ['Service', 'Date', 'Your Info', 'Confirmation'];

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
        /** Not collected on site; team arranges payment (cash, card, etc.) with the customer */
        paymentMethod: '',
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
        setStep(3);
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
      case 2: return info.firstName && info.lastName && info.phone && info.email && info.street && info.city && info.zip && info.termsAccepted && !submitting;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step === 2) {
      submitBooking();
      return;
    }
    setStep((s) => s + 1);
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
    <>
      <PageIntro
        label="Services, pricing & booking"
        title="Everything in one place — see pricing, then book"
        description="Compare our rates and service list, then scroll down to pick a service, choose a date, and send your request. We follow up with your quote and scheduling — nothing is paid on this site."
        primaryLabel="Get My Free Quote"
        onPrimaryAction={() => openModal?.()}
        secondaryLabel="View Service Area"
        secondaryTo="/service-area"
      />
      <Pricing openModal={openModal} />
      <Services />
      <WhyUs />
      <FAQ />

      <section id="book-wizard" className="book section-padding book--below-fold">
        <div className="container book__container">
          <p className="book__section-kicker">Book online</p>
          <h1 className="book__title">Book a Service</h1>
        <StepIndicator current={step} steps={steps} />

        <div className="book__panel">
          {step === 0 && (
            <div className="book__services">
              <h2>Select a Service</h2>
              <p className="book__hint">
                Choose the service you&apos;re interested in. Pricing shown is a guide — we&apos;ll confirm your quote
                and schedule after you submit. Nothing is charged on this website.
              </p>
              <div className="book__service-grid">
                {BOOKABLE_SERVICES.map((svc) => {
                  const Icon = svc.icon;
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      className={`book__service-card ${service?.id === svc.id ? 'book__service-card--selected' : ''}`}
                      onClick={() => setService(svc)}
                    >
                      <Icon size={28} />
                      <strong>{svc.label}</strong>
                      <span className="book__service-desc">{svc.desc}</span>
                      <span className="book__service-price">{svc.price}</span>
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
              <p className="book__hint">
                No account required. We&apos;ll use this to send your request to our calendar and sheet and follow up with your quote.
              </p>
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
              {submitError && (
                <p className="book__error">{submitError}</p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="book__confirm">
              <FiCheck size={48} className="book__confirm-icon" />
              <h2>Request received</h2>
              <p className="book__confirm-id">Reference: <strong>{confirmationId}</strong></p>
              <p className="book__confirm-lead">
                Your details have been saved. Our team will follow up with your quote and to confirm scheduling.
                Payment is never processed on this site — we&apos;ll go over options (including cash or online) when we connect.
              </p>
              <div className="book__confirm-summary">
                <div className="book__confirm-row">
                  <span>Service</span><strong>{service?.label}</strong>
                </div>
                <div className="book__confirm-row">
                  <span>Preferred date</span><strong>{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                </div>
                <div className="book__confirm-row">
                  <span>Time window</span><strong>Between 7:00 AM &ndash; 5:00 PM</strong>
                </div>
                <div className="book__confirm-row">
                  <span>Customer</span><strong>{info.firstName} {info.lastName}</strong>
                </div>
                <div className="book__confirm-row">
                  <span>Address</span><strong>{info.street}, {info.city} {info.zip}</strong>
                </div>
              </div>
              <Link to="/" className="btn btn-gold">Back to Home</Link>
            </div>
          )}
        </div>

        {step < 3 && (
          <div className="book__nav">
            {step > 0 && (
              <button type="button" className="btn btn-outline--dark" onClick={() => setStep((s) => s - 1)}>
                <FiArrowLeft size={16} /> Back
              </button>
            )}
            <button
              type="button"
              className="btn btn-gold"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {submitting ? (
                <><FiLoader size={16} className="book__spinner" /> Submitting...</>
              ) : (
                <>{step === 2 ? 'Submit request' : 'Continue'} <FiArrowRight size={16} /></>
              )}
            </button>
          </div>
        )}
        </div>
      </section>
    </>
  );
}
