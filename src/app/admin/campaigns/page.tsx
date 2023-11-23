import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ButtonLink from '@/components/ButtonLink';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CampaignsAdminTable from '@/components/Tables/CampaignsAdminTable';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

export default function AdminCampaigns() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Campaigns</SectionHeader>
      <div className='space-y-2'>
        <ButtonLink
          label='New Campaign'
          icon={faPlus}
          route={buildRoute({
            category: RoutePath.Campaigns,
            slug: 'create',
            admin: true,
          })}
        />
        <CampaignsAdminTable />
      </div>
    </Section>
  );
}
