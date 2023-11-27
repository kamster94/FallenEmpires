import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import BackgroundsViewTable from '@/components/Tables/BackgroundsViewTable';
import Section from '@/components/Section';

export default function Backgrounds() {
  return (
    <Page>
      <PageHeader>Backgrounds</PageHeader>
      <Section className='md:px-12'>
        <BackgroundsViewTable />
      </Section>
    </Page>
  );
}
