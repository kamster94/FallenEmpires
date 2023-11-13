import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import CampaignForm from '@/components/Forms/CampaignForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function AdminCreateCustomCampaign() {
  return (
    <Section>
      <SectionHeader>Campaigns</SectionHeader>
      <div className="flex space-x-2 items-center mb-4">
        <ButtonLink route='/admin/campaigns' icon={faArrowLeft} />
        <h4 className="text-primary font-bold text-xl">Create New</h4>
      </div>
      <div>
        <CampaignForm campaign={{ name: '', text: '', slug: '' }} />
      </div>
    </Section>
  );
}
