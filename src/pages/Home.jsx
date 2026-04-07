import Hero from '../components/Hero';
import Pricing from '../components/Pricing';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import FAQ from '../components/FAQ';
import TrustStrip from '../components/TrustStrip';
import CTA from '../components/CTA';

export default function Home({ openModal }) {
  return (
    <>
      <Hero openModal={openModal} />
      <Pricing openModal={openModal} />
      <Services />
      <WhyUs />
      <FAQ />
      <TrustStrip />
      <CTA openModal={openModal} />
    </>
  );
}
