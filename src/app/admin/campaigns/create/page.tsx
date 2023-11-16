import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import CampaignForm from '@/components/Forms/CampaignForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function AdminCreateCustomCampaign() {
  return (
    <Section>
      <SectionHeader>Campaigns</SectionHeader>
      <div className='mb-4 flex items-center space-x-2'>
        <ButtonLink route='/admin/campaigns' icon={faArrowLeft} />
        <h4 className='text-xl font-bold text-primary'>Create New</h4>
      </div>
      <div>
        <CampaignForm campaign={{ name: '', text: '', slug: '' }} />
      </div>
    </Section>
  );
}
