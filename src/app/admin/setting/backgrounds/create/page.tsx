import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import BackgroundForm from '@/components/Forms/BackgroundForm';
import { RoutePath } from '@/enums';
import useRoute from '@/hooks/useRoute';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default function AdminCreateBackground() {
  const { buildRoute } = useRoute();
  return (
    <Section>
      <SectionHeader>Backgrounds</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Backgrounds,
            admin: true,
          })}
          type='button'
        />
        <SubSectionHeader>Create New</SubSectionHeader>
      </SubSection>
      <div>
        <BackgroundForm background={{ title: '', text: '', slug: '' }} />
      </div>
    </Section>
  );
}
