import PageIntro from '../components/PageIntro';
import Contact from '../components/Contact';
import About from '../components/About';

export default function ContactQuote({ openModal }) {
  return (
    <>
      <PageIntro
        label="Contact & Quote"
        title="Get Your Quote and Book the Next Step"
        description="Tell us what you need, where the property is, and when you want service. We'll respond with a free quote and the fastest path to scheduling."
        primaryLabel="Open Quick Quote"
        onPrimaryAction={openModal}
        secondaryLabel="See Services & Pricing"
        secondaryTo="/book"
      />

      <div className="contact-lawn-photo">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt="Freshly groomed lawn maintained by Jus Lawns"
          loading="lazy"
        />
      </div>

      <Contact />
      <About />

      <style>{`
        .contact-lawn-photo {
          width: 100%;
          max-height: 520px;
          overflow: hidden;
          line-height: 0;
        }
        .contact-lawn-photo img {
          width: 100%;
          height: 520px;
          object-fit: cover;
          object-position: center 60%;
          display: block;
        }
        @media (max-width: 640px) {
          .contact-lawn-photo img {
            height: 260px;
          }
        }
      `}</style>
    </>
  );
}
