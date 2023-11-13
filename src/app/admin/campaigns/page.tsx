import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ButtonLink from '@/components/ButtonLink';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CampaignsAdminTable from '@/components/Tables/CampaignsAdminTable';

export default function AdminCampaigns() {
  return (
    <Section>
      <SectionHeader>Campaigns</SectionHeader>
      <div className="space-y-2">
        <ButtonLink label="New Campaign" icon={faPlus} route="/admin/campaigns/create" />
        <CampaignsAdminTable />
      </div>
    </Section>
  );
}
