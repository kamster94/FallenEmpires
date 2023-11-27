import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import HeritageForm from '@/components/Forms/HeritageForm';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default function AdminCreateHeritage() {
  const { buildRoute } = useRoute();
  return (
    <Section>
      <SectionHeader>Heritages</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Rules,
            subcategory: RoutePath.Heritages,
            admin: true,
          })}
          type='button'
        />
        <SubSectionHeader>Create New</SubSectionHeader>
      </SubSection>
      <div>
        <HeritageForm heritage={{ name: '', description: '', slug: '' }} />
      </div>
    </Section>
  );
}
