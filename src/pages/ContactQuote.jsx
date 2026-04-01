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
        secondaryTo="/services-pricing"
      />
      <Contact />
      <About />
    </>
  );
}
