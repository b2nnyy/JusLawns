import { useState } from 'react';
import { faqs } from '../data/siteData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="faq section-padding" id="faq">
      <div className="container">
        <p className="section-label text-center">FAQ</p>
        <h2 className="text-center">Frequently Asked Questions</h2>

        <div className="faq__list">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`faq__item${isOpen ? ' faq__item--open' : ''}`}>
                <button className="faq__question" onClick={() => toggle(i)}>
                  <span>{item.question}</span>
                  <span className="faq__icon">+</span>
                </button>
                <div className="faq__answer" style={{ maxHeight: isOpen ? '300px' : '0' }}>
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq {
          background: var(--warm-white);
        }
        .faq__list {
          max-width: 720px;
          margin: 48px auto 0;
        }
        .faq__item {
          border-bottom: 1px solid var(--sand);
        }
        .faq__question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          background: none;
          border: none;
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 600;
          color: var(--charcoal);
          cursor: pointer;
          text-align: left;
          gap: 16px;
        }
        .faq__icon {
          font-size: 1.4rem;
          font-weight: 300;
          color: var(--text-muted);
          transition: transform 0.3s ease, color 0.3s ease;
          flex-shrink: 0;
          line-height: 1;
        }
        .faq__item--open .faq__icon {
          transform: rotate(45deg);
          color: var(--gold);
        }
        .faq__answer {
          overflow: hidden;
          transition: max-height 0.35s ease;
        }
        .faq__answer p {
          padding-bottom: 20px;
          font-size: 0.93rem;
          color: var(--text-muted);
          line-height: 1.7;
        }
      `}</style>
    </section>
  );
}
