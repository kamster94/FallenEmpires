import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import HeritagesViewTable from '@/components/Tables/HeritagesViewTable';
import Section from '@/components/Section';

export default function Heritages() {
  return (
    <Page>
      <PageHeader title='Heritages' />
      <Section className='md:px-12'>
        <HeritagesViewTable />
      </Section>
    </Page>
  );
}
