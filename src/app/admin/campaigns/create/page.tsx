import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import CampaignForm from '@/components/Forms/CampaignForm';
import { RoutePath } from '@/enums';
import useRoute from '@/hooks/useRoute';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default function AdminCreateCampaign() {
  const { buildRoute } = useRoute();
  return (
    <Section>
      <SectionHeader>Campaigns</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({ category: RoutePath.Campaigns, admin: true })}
          type='button'
        />
        <SubSectionHeader>Create New</SubSectionHeader>
      </SubSection>
      <div>
        <CampaignForm campaign={{ name: '', text: '', slug: '' }} />
      </div>
    </Section>
  );
}
