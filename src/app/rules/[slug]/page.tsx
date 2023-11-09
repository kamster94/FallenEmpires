import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import useDatabase from '@/hooks/useDatabase';
import { notFound } from 'next/navigation';

export default async function CustomRulePage({ params }: { params: { slug: string } }) {
  const { getRulePage } = useDatabase();
  const rulePage = await getRulePage(params.slug);
  if (!rulePage) {
    return notFound();
  }

  return (
    <Page>
      <PageHeader title={rulePage.title} />
      {rulePage.text}
    </Page>
  );
}
