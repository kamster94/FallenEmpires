import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import LanguagesViewTable from '@/components/Tables/LanguagesViewTable';
import Section from '@/components/Section';

export default function Languages() {
  return (
    <Page>
      <PageHeader>Languages</PageHeader>
      <Section className='md:px-12'>
        <LanguagesViewTable />
      </Section>
    </Page>
  );
}
