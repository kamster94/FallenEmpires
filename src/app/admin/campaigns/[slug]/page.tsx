import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import CampaignForm from '@/components/Forms/CampaignForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getCampaign } from '@/app/actions';

export default async function AdminGeneralRulesEdit({ params }: { params: { slug: string } }) {
  const campaign = await getCampaign(params.slug);
  if (!campaign) {
    return notFound();
  }

  return (
    <Section>
      <SectionHeader>Campaigns</SectionHeader>
      <div className="flex space-x-2 items-center mb-4">
        <ButtonLink route='/admin/campaigns' icon={faArrowLeft} />
        <h4 className="text-primary font-bold text-xl">Editing: {campaign.name}</h4>
      </div>

      <div>
        <CampaignForm campaign={campaign} />
      </div>
    </Section>
  );
}
