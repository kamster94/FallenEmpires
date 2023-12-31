import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/Markdown/MarkdownContent';
import { getRulePage } from '@/app/actions';

export default async function CustomRulePage({
  params,
}: {
  params: { slug: string };
}) {
  const rulePage = await getRulePage(params.slug);
  if (!rulePage) {
    return notFound();
  }

  return (
    <Page>
      <PageHeader>{rulePage.title}</PageHeader>
      <MarkdownContent className='md:px-12'>{rulePage.text}</MarkdownContent>
    </Page>
  );
}
