import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import LanguageForm from '@/components/Forms/LanguageForm';
import { RoutePath } from '@/enums';
import useRoute from '@/hooks/useRoute';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default function AdminCreateLanguage() {
  const { buildRoute } = useRoute();
  return (
    <Section>
      <SectionHeader>Languages</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Languages,
            admin: true,
          })}
          type='button'
        />
        <SubSectionHeader>Create New</SubSectionHeader>
      </SubSection>
      <div>
        <LanguageForm language={{ title: '', text: '', slug: '' }} />
      </div>
    </Section>
  );
}
