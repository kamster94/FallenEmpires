import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import SettingPageForm from '@/components/Forms/SettingPageForm';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default function AdminCreateCustomSettingPage() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Custom Setting Pages</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.CustomPages,
            admin: true,
          })}
          type='button'
        />
        <SubSectionHeader>Create New</SubSectionHeader>
      </SubSection>
      <div>
        <SettingPageForm settingPage={{ title: '', text: '', slug: '' }} />
      </div>
    </Section>
  );
}
