import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import { getGeneralSetting } from '@/app/actions';
import MarkdownContent from '@/components/Markdown/MarkdownContent';
import { GeneralSettingKey } from '@/enums';

export default async function Home() {
  const homePageText = await getGeneralSetting(GeneralSettingKey.HomePageText);

  return (
    <Page>
      <PageHeader>Age of Fallen Empires</PageHeader>
      <MarkdownContent className='md:px-12'>
        {homePageText?.value ?? ''}
      </MarkdownContent>
    </Page>
  );
}
