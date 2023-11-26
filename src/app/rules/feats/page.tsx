import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import FeatsViewTable from '@/components/Tables/FeatsViewTable';
import Section from '@/components/Section';

export default function Feats() {
  return (
    <Page>
      <PageHeader title='Feats' />
      <Section className='md:px-12'>
        <FeatsViewTable />
      </Section>
    </Page>
  );
}
