import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import { getGeneralSetting } from '@/app/actions';
import MarkdownContent from '@/components/Markdown/MarkdownContent';
import { GeneralSettingKey } from '@/enums';

export default async function Home() {
  const homePageText = await getGeneralSetting(GeneralSettingKey.HomePageText);

  return (
    <Page>
      <PageHeader title='Age of Fallen Empires' />
      <MarkdownContent>{homePageText?.value ?? ''}</MarkdownContent>
    </Page>
  );
}
