import Hero from '../components/Hero';
import Pricing from '../components/Pricing';
import Services from '../components/Services';
import TrustStrip from '../components/TrustStrip';
import CTA from '../components/CTA';

export default function Home({ openModal }) {
  return (
    <>
      <Hero openModal={openModal} />
      <Pricing openModal={openModal} />
      <Services />
      <TrustStrip />
      <CTA openModal={openModal} />
    </>
  );
}
