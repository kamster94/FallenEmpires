import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import AncestryForm from '@/components/Forms/AncestryForm';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import SubSection from '@/components/SubSection';
import NavigateBack from '@/components/NavigateBack';
import SubSectionHeader from '@/components/SubSectionHeader';

export default function AdminCreateAncestry() {
  const { buildRoute } = useRoute();
  return (
    <Section>
      <SectionHeader>Ancestries</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Rules,
            subcategory: RoutePath.Ancestries,
            admin: true,
          })}
          type='button'
        />
        <SubSectionHeader>Create New</SubSectionHeader>
      </SubSection>
      <div>
        <AncestryForm ancestry={{ name: '', description: '', slug: '' }} />
      </div>
    </Section>
  );
}
