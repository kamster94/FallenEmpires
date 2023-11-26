import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/Markdown/MarkdownContent';
import { getSettingPage } from '@/app/actions';

export default async function CustomSettingPage({
  params,
}: {
  params: { slug: string };
}) {
  const settingPage = await getSettingPage(params.slug);
  if (!settingPage) {
    return notFound();
  }

  return (
    <Page>
      <PageHeader title={settingPage.title} />
      <MarkdownContent className='md:px-12'>{settingPage.text}</MarkdownContent>
    </Page>
  );
}
