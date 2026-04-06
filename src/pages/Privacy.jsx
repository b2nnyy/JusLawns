// TODO: Replace placeholder content with actual Privacy Policy provided by Amirah
import PageIntro from '../components/PageIntro';

export default function Privacy() {
  return (
    <>
      <PageIntro title="Privacy Policy" description="How we handle your information." />
      <section className="section-padding">
        <div className="container" style={{ maxWidth: 720 }}>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Our privacy policy is being prepared and will be available soon.
            If you have questions about how we handle your data, please contact us at{' '}
            <a href="mailto:info@juslawns.com" style={{ color: 'var(--green-accent)', fontWeight: 600 }}>
              info@juslawns.com
            </a>.
          </p>
        </div>
      </section>
    </>
  );
}
