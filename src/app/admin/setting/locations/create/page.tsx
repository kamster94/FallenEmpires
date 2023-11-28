import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import LocationForm from '@/components/Forms/LocationForm';
import { RoutePath } from '@/enums';
import useRoute from '@/hooks/useRoute';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default function AdminCreateLocation() {
  const { buildRoute } = useRoute();
  return (
    <Section>
      <SectionHeader>Locations</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Locations,
            admin: true,
          })}
          type='button'
        />
        <SubSectionHeader>Create New</SubSectionHeader>
      </SubSection>
      <div>
        <LocationForm location={{ name: '', description: '', slug: '' }} />
      </div>
    </Section>
  );
}
