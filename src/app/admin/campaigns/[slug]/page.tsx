import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import CampaignForm from '@/components/Forms/CampaignForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getCampaign } from '@/app/actions';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

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
      <div className='mb-4 flex items-center space-x-2'>
        <ButtonLink
          route={buildRoute({ category: RoutePath.Campaigns, admin: true })}
          icon={faArrowLeft}
        />
        <h4 className='text-xl font-bold text-primary'>
          Editing: {campaign.name}
        </h4>
      </div>

      <div>
        <CampaignForm campaign={campaign} />
      </div>
    </Section>
  );
}
