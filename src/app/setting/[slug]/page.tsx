import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import useDatabase from '@/hooks/useDatabase';
import { notFound } from 'next/navigation';

export default async function CustomSettingPage({ params }: { params: { slug: string } }) {
  const { getSettingPage } = useDatabase();
  const settingPage = await getSettingPage(params.slug);
  if (!settingPage) {
    return notFound();
  }

  return (
    <Page>
      <PageHeader title={settingPage.title} />
      {settingPage.text}
    </Page>
  );
}
