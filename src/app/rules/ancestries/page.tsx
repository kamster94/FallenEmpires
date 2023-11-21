import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import AncestriesViewTable from '@/components/Tables/AncestriesViewTable';
import Section from '@/components/Section';

export default function Ancestries() {
  return (
    <Page>
      <PageHeader title='Ancestries' />
      <Section className='md:px-12'>
        <AncestriesViewTable />
      </Section>
    </Page>
  );
}
