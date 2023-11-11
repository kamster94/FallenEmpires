import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import useDatabase from '@/hooks/useDatabase';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/Markdown/MarkdownContent';

export default async function CustomSettingPage({ params }: { params: { slug: string } }) {
  const { getSettingPage } = useDatabase();
  const settingPage = await getSettingPage(params.slug);
  if (!settingPage) {
    return notFound();
  }

  return (
    <Page>
      <PageHeader title={settingPage.title} />
      <MarkdownContent>{settingPage.text}</MarkdownContent>
    </Page>
  );
}
