import PageIntro from '../components/PageIntro';
import { businessInfo } from '../data/siteData';

export default function Privacy() {
  return (
    <>
      <PageIntro
        title="Privacy Policy"
        description="How we collect, use, and protect your personal information."
      />
      <section className="section-padding legal-page">
        <div className="container legal-page__inner">
          <article className="legal-doc">
            <p className="legal-doc__effective">
              <strong>Effective Date:</strong> April 7, 2026
            </p>
            <p>
              Jus Lawns LLC respects your privacy and is committed to protecting your personal information. This
              Privacy Policy explains how we collect, use, and safeguard your information.
            </p>

            <h2>Section 1 — Information We Collect</h2>
            <p>
              We may collect name, address, phone number, email address, service history, payment information,
              property access instructions, communication preferences.
            </p>

            <h2>Section 2 — How Information Is Collected</h2>
            <p>
              Information may be collected through website forms, scheduling systems, invoices, SMS communication,
              phone conversations, service agreements.
            </p>

            <h2>Section 3 — Use of Information</h2>
            <p>
              We use collected data to schedule services, process payments, communicate service updates, provide
              estimates, improve operations, resolve disputes, comply with legal obligations.
            </p>

            <h2>Section 4 — Payment Security</h2>
            <p>
              Payment processing is handled by secure third-party processors. Jus Lawns LLC does not store full
              credit card numbers.
            </p>

            <h2>Section 5 — SMS Communication Consent</h2>
            <p>
              By providing a phone number, you consent to receive appointment reminders, scheduling updates,
              service notifications. Message frequency varies. Standard carrier rates may apply. You may opt out
              anytime by requesting removal.
            </p>

            <h2>Section 6 — Email Communication</h2>
            <p>
              We may send invoices, confirmations, service notices, promotions (optional). Clients may unsubscribe
              from marketing emails.
            </p>

            <h2>Section 7 — Sharing of Information</h2>
            <p>
              We do not sell personal information. Information may be shared with payment processors, scheduling
              platforms, service personnel, legal authorities if required.
            </p>

            <h2>Section 8 — Property Photos</h2>
            <p>
              Service-related property photos may be collected for documentation, dispute resolution, training,
              internal operations. Marketing use requires permission unless identifying details are removed.
            </p>

            <h2>Section 9 — Data Retention</h2>
            <p>
              Customer records are retained as long as necessary for service history, accounting compliance,
              dispute defense, legal obligations.
            </p>

            <h2>Section 10 — Data Protection Measures</h2>
            <p>
              We implement reasonable safeguards including secure storage systems, restricted access controls,
              encrypted payment processing.
            </p>

            <h2>Section 11 — Children&apos;s Privacy</h2>
            <p>
              Services are not directed to individuals under age 18. We do not knowingly collect data from minors.
            </p>

            <h2>Section 12 — Client Rights</h2>
            <p>
              Clients may request data correction, record updates, communication removal. Requests may be submitted
              in writing.
            </p>

            <h2>Section 13 — Legal Disclosure Requirements</h2>
            <p>
              Information may be disclosed when required by court order, subpoena, regulatory obligation, fraud
              investigation.
            </p>

            <h2>Section 14 — Policy Updates</h2>
            <p>
              This policy may be updated periodically. Continued service use constitutes acceptance of updates.
            </p>

            <h2>Section 15 — Contact Information</h2>
            <p>
              {businessInfo.legalName}, {businessInfo.addressLine1}, {businessInfo.cityStateZip}. Email:{' '}
              <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a>. Phone:{' '}
              <a href={`tel:${businessInfo.phone}`}>{businessInfo.phone}</a>.
            </p>
          </article>
        </div>
      </section>

      <style>{`
        .legal-page__inner {
          max-width: 720px;
        }
        .legal-doc {
          color: var(--text-body);
          line-height: 1.75;
          font-size: 0.95rem;
        }
        .legal-doc__effective {
          margin-bottom: 1.25rem;
        }
        .legal-doc h2 {
          font-size: 1.05rem;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: var(--charcoal);
        }
        .legal-doc p {
          margin: 0 0 1rem;
          color: var(--text-muted);
        }
        .legal-doc a {
          color: var(--green-accent);
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
