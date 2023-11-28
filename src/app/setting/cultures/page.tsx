import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import CulturesViewTable from '@/components/Tables/CulturesViewTable';
import Section from '@/components/Section';

export default function Cultures() {
  return (
    <Page>
      <PageHeader>Cultures</PageHeader>
      <Section className='md:px-12'>
        <CulturesViewTable />
      </Section>
    </Page>
  );
}
