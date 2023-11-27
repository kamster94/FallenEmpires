import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import FeatForm from '@/components/Forms/FeatForm';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import SubSection from '@/components/SubSection';
import NavigateBack from '@/components/NavigateBack';
import SubSectionHeader from '@/components/SubSectionHeader';

export default function AdminCreateFeat() {
  const { buildRoute } = useRoute();
  return (
    <Section>
      <SectionHeader>Feats</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Rules,
            subcategory: RoutePath.Feats,
            admin: true,
          })}
          type='button'
        />
        <SubSectionHeader>Create New</SubSectionHeader>
      </SubSection>
      <div>
        <FeatForm feat={{ name: '', description: '', slug: '' }} />
      </div>
    </Section>
  );
}
