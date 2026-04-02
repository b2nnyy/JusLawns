import PageIntro from '../components/PageIntro';
import Pricing from '../components/Pricing';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import FAQ from '../components/FAQ';

export default function ServicesPricing({ openModal }) {
  return (
    <>
      <PageIntro
        label="Services & Pricing"
        title="See What We Offer and What It Costs"
        description="Everything you need to make a hiring decision quickly: clear pricing, the services we provide, and the reasons homeowners keep choosing JusLawns."
        primaryLabel="Get My Free Quote"
        onPrimaryAction={openModal}
        secondaryLabel="View Service Area"
        secondaryTo="/service-area"
      />
      <Pricing openModal={openModal} />
      <Services />
      <WhyUs />
      <FAQ />
    </>
  );
}
