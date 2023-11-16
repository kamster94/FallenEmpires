import MarkdownContent from '@/components/Markdown/MarkdownContent';
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import { notFound } from 'next/navigation';
import { getCampaign } from '@/app/actions';

export default async function CampaignPage({
  params,
}: {
  params: { slug: string };
}) {
  const campaign = await getCampaign(params.slug);
  if (!campaign) {
    return notFound();
  }

  return (
    <Page>
      <PageHeader title={campaign.name} />
      <MarkdownContent>{campaign.text}</MarkdownContent>
    </Page>
  );
}
