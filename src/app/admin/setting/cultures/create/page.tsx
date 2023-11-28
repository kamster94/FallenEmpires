import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import CultureForm from '@/components/Forms/CultureForm';
import { RoutePath } from '@/enums';
import useRoute from '@/hooks/useRoute';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default function AdminCreateCulture() {
  const { buildRoute } = useRoute();
  return (
    <Section>
      <SectionHeader>Cultures</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Cultures,
            admin: true,
          })}
          type='button'
        />
        <SubSectionHeader>Create New</SubSectionHeader>
      </SubSection>
      <div>
        <CultureForm culture={{ name: '', description: '', slug: '' }} />
      </div>
    </Section>
  );
}
