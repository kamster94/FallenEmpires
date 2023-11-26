import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import CampaignForm from '@/components/Forms/CampaignForm';
import { getCampaign } from '@/app/actions';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default async function AdminCampaignsEdit({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();

  const campaign = await getCampaign(params.slug);
  if (!campaign) {
    return notFound();
  }

  return (
    <Section>
      <SectionHeader>Campaigns</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({ category: RoutePath.Campaigns, admin: true })}
          type='button'
        />
        <SubSectionHeader>Editing: {campaign.name}</SubSectionHeader>
      </SubSection>

      <div>
        <CampaignForm campaign={campaign} />
      </div>
    </Section>
  );
}
