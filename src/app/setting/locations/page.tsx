import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import LocationsViewTable from '@/components/Tables/LocationsViewTable';
import Section from '@/components/Section';

export default function Locations() {
  return (
    <Page>
      <PageHeader>Locations</PageHeader>
      <Section className='md:px-12'>
        <LocationsViewTable />
      </Section>
    </Page>
  );
}
