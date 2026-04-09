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
      <section className="home-social-promo section-padding">
        <div className="container text-center">
          <p className="home-social-promo__text">
            Follow us on Instagram and Facebook for updates.
          </p>
          <a
            className="btn btn-outline--dark home-social-promo__link"
            href="https://www.instagram.com/lawnsbyjus"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Jus Lawns on Instagram"
          >
            Follow us on Instagram
          </a>
        </div>
      </section>
    </>
  );
}
