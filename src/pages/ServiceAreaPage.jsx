import PageIntro from '../components/PageIntro';
import ServiceArea from '../components/ServiceArea';
import CTA from '../components/CTA';

export default function ServiceAreaPage({ openModal }) {
  return (
    <>
      <PageIntro
        label="Service Area"
        title="Check If We Serve Your Neighborhood"
        description="See the neighborhoods we actively cover across Philadelphia and surrounding areas. The map below shows approximate service-zone pin locations for quick reference."
        primaryLabel="Check My Property"
        onPrimaryAction={openModal}
        secondaryLabel="See Pricing"
        secondaryTo="/book"
      />
      <ServiceArea openModal={openModal} />
      <CTA openModal={openModal} />
    </>
  );
}
