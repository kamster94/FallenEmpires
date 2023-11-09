import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import useDatabase from '@/hooks/useDatabase';
import { notFound } from 'next/navigation';

export default async function CampaignPage({ params }: { params: { slug: string } }) {
  const { getCampaign } = useDatabase();
  const campaign = await getCampaign(params.slug);
  if (!campaign) {
    return notFound();
  }

  return (
    <Page>
      <PageHeader title={campaign.name} />
      {campaign.text}
    </Page>
  );
}
