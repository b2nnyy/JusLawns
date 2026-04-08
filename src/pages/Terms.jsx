import PageIntro from '../components/PageIntro';
import { businessInfo } from '../data/siteData';

export default function Terms() {
  return (
    <>
      <PageIntro
        title="Terms & Conditions"
        description="Please read these terms carefully. They govern services provided by Jus Lawns LLC."
      />
      <section className="section-padding legal-page">
        <div className="container legal-page__inner">
          <article className="legal-doc">
            <p className="legal-doc__effective">
              <strong>Effective Date:</strong> April 7, 2026
            </p>
            <p>
              These Terms and Conditions (&quot;Agreement&quot;) govern all services provided by Jus Lawns LLC
              (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) to the customer
              (&quot;Client,&quot; &quot;you,&quot; or &quot;your&quot;). By scheduling, authorizing, or accepting
              services, you agree to these terms.
            </p>

            <h2>Section 1 — Scope of Services</h2>
            <p>
              Jus Lawns LLC provides residential and commercial lawn maintenance and exterior property services
              including but not limited to: lawn mowing, edging and trimming, hedge trimming, seasonal cleanup,
              debris removal, power washing, trash bin sanitation, light landscaping, property appearance
              maintenance. Services are limited to the agreed service description at booking. Additional work
              requires separate authorization and pricing.
            </p>

            <h2>Section 2 — Service Scheduling</h2>
            <p>
              Recurring services are scheduled weekly or biweekly unless otherwise agreed. One-time services are
              scheduled based on availability. Arrival windows are approximate and not guaranteed due to traffic,
              equipment issues, weather, prior job delays, safety considerations. Missed service windows do not
              constitute breach of contract.
            </p>

            <h2>Section 3 — Weather Delays</h2>
            <p>
              Services may be delayed due to rain, extreme heat, lightning, snow, saturated soil, unsafe site
              conditions. Delayed services will be rescheduled automatically within a reasonable timeframe. No
              refunds are issued due to weather delays.
            </p>

            <h2>Section 4 — Property Access Requirements</h2>
            <p>
              Client agrees to provide safe access to lawns, gates, service areas, water access if required,
              exterior electrical outlets if required. Locked gates, blocked access, or restrained animals
              preventing service may result in a service attempt charge.
            </p>

            <h2>Section 5 — Client Property Responsibilities</h2>
            <p>
              Client must remove toys, debris, wires, hoses, and obstacles; identify underground hazards; disclose
              irrigation systems; disclose invisible fencing; disclose fragile edging or decorations. Jus Lawns LLC
              is not responsible for damage to undisclosed hazards.
            </p>

            <h2>Section 6 — Underground Installations Disclaimer</h2>
            <p>
              Client must notify Company of sprinkler heads, invisible fences, drainage systems, buried wiring,
              landscape lighting. Company is not liable for damage to unmarked installations.
            </p>

            <h2>Section 7 — Lawn Condition Disclosure</h2>
            <p>
              Overgrown lawns exceeding 6 inches in height may require multiple passes, additional labor, equipment
              strain adjustments, surcharge pricing. First-cut restoration fees may apply.
            </p>

            <h2>Section 8 — Add-On Service Authorization</h2>
            <p>
              Additional services requested onsite may be performed without written amendment if verbally approved.
              Approval authorizes billing at standard service rates.
            </p>

            <h2>Section 9 — Payment Terms</h2>
            <p>
              Payment is due immediately at time of booking or service agreement to provide service for one-time
              visits, and automatically per billing cycle for recurring services. Accepted methods: card, ACH,
              invoice payment, approved digital payment platforms. Late balances may result in service suspension.
            </p>

            <h2>Section 10 — Late Payment Policy</h2>
            <p>
              Balances unpaid after 7 days may incur late fees, collection costs, service interruption. Accounts
              unpaid after 30 days may be referred to collections. Client agrees to pay reasonable recovery costs
              permitted by law.
            </p>

            <h2>Section 11 — Returned Payment Fees</h2>
            <p>
              Returned checks or failed transactions incur a processing fee of $35 or the maximum permitted by
              Pennsylvania law.
            </p>

            <h2>Section 12 — Service Satisfaction Window</h2>
            <p>
              Clients must report service concerns within 24 hours of completion. Company will inspect and
              reasonably correct verified issues. Failure to report concerns within 24 hours constitutes acceptance
              of work.
            </p>

            <h2>Section 13 — Damage Claims Procedure</h2>
            <p>
              Damage claims must be submitted within 48 hours. Claims must include description, photos, service
              date. Company reserves the right to inspect before repair authorization. Unauthorized third-party
              repairs void reimbursement eligibility.
            </p>

            <h2>Section 14 — Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by Pennsylvania law, Jus Lawns LLC is not liable for pre-existing
              property damage, hidden hazards, landscape settling, soil conditions, weather-related lawn stress,
              turf disease, underground infrastructure damage not disclosed. Maximum liability shall not exceed the
              amount paid for the service in question.
            </p>

            <h2>Section 15 — Power Washing Risk Disclosure</h2>
            <p>
              Power washing may expose oxidized surfaces, loose paint, deteriorated masonry, aged siding defects.
              Client accepts inherent restoration risks prior to service.
            </p>

            <h2>Section 16 — Trash Bin Sanitation Disclosure</h2>
            <p>
              Bin sanitation services remove odor, residue, and bacteria but do not guarantee complete stain
              removal.
            </p>

            <h2>Section 17 — Independent Contractor Status</h2>
            <p>
              Jus Lawns LLC personnel are independent contractors or employees of Jus Lawns LLC only. No worker
              represents the Client or property owner.
            </p>

            <h2>Section 18 — Safety Conditions</h2>
            <p>
              Services will not be performed when conditions present risk including aggressive animals, unsafe
              terrain, obstructed areas, hazardous debris, illegal dumping materials. Full service fees may still
              apply if unsafe conditions prevent completion.
            </p>

            <h2>Section 19 — Cancellation Policy</h2>
            <p>
              Recurring service cancellations require 48 hours notice. Same-day cancellations may incur a service
              charge.
            </p>

            <h2>Section 20 — Termination of Service</h2>
            <p>
              Company reserves the right to terminate services due to unsafe environments, harassment, nonpayment,
              repeated cancellations, property access denial.
            </p>

            <h2>Section 21 — Seasonal Suspension</h2>
            <p>
              Clients may pause recurring services with advance notice. Reactivation scheduling is subject to
              availability.
            </p>

            <h2>Section 22 — Photo Documentation Authorization</h2>
            <p>
              Company may photograph property conditions before and after service for quality control, dispute
              resolution, training, marketing (non-identifying unless consent provided). Clients may opt out in
              writing.
            </p>

            <h2>Section 23 — Property Line Responsibility</h2>
            <p>
              Client is responsible for identifying property boundaries. Company is not liable for service
              performed outside unclear boundary lines.
            </p>

            <h2>Section 24 — Pesticide and Chemical Services</h2>
            <p>
              If applicable, chemical applications comply with Pennsylvania Department of Agriculture regulations.
              Required notices will be provided when legally necessary.
            </p>

            <h2>Section 25 — Arbitration Clause</h2>
            <p>
              Disputes not resolved informally shall be resolved through binding arbitration in Pennsylvania
              unless prohibited by law. Each party bears its own legal costs unless otherwise awarded.
            </p>

            <h2>Section 26 — Governing Law</h2>
            <p>This Agreement is governed by the laws of the Commonwealth of Pennsylvania.</p>

            <h2>Section 27 — Entire Agreement</h2>
            <p>These Terms represent the entire agreement between Client and Jus Lawns LLC.</p>

            <p className="legal-doc__contact">
              Questions? Contact {businessInfo.legalName} at{' '}
              <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a> or{' '}
              <a href={`tel:${businessInfo.phone}`}>{businessInfo.phone}</a>.
              Mailing address: {businessInfo.addressFull}.
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
        .legal-doc ul {
          margin: 0 0 1rem 1.25rem;
          color: var(--text-muted);
          padding-left: 0.5rem;
        }
        .legal-doc li {
          margin-bottom: 0.35rem;
        }
        .legal-doc__contact {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--sand);
        }
        .legal-doc__contact a {
          color: var(--green-accent);
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
