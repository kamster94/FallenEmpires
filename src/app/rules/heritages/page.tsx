import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import HeritagesViewTable from '@/components/Tables/HeritagesViewTable';
import Section from '@/components/Section';

export default function Heritages() {
  return (
    <Page>
      <PageHeader>Heritages</PageHeader>
      <Section className='md:px-12'>
        <HeritagesViewTable />
      </Section>
    </Page>
  );
}
