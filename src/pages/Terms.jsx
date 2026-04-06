// TODO: Replace placeholder content with actual Terms & Conditions provided by Amirah
import PageIntro from '../components/PageIntro';

export default function Terms() {
  return (
    <>
      <PageIntro title="Terms & Conditions" description="Please review our terms of service." />
      <section className="section-padding">
        <div className="container" style={{ maxWidth: 720 }}>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Terms and conditions content is being prepared and will be available soon.
            If you have questions about our policies, please contact us at{' '}
            <a href="mailto:info@juslawns.com" style={{ color: 'var(--green-accent)', fontWeight: 600 }}>
              info@juslawns.com
            </a>.
          </p>
        </div>
      </section>
    </>
  );
}
