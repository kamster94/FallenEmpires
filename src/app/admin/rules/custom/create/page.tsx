import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import RulePageForm from '@/components/Forms/RulePageForm';
import { RoutePath } from '@/enums';
import useRoute from '@/hooks/useRoute';
import SubSection from '@/components/SubSection';
import NavigateBack from '@/components/NavigateBack';
import SubSectionHeader from '@/components/SubSectionHeader';

export default function AdminCreateCustomRulePage() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Custom Rule Pages</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Rules,
            subcategory: RoutePath.CustomPages,
            admin: true,
          })}
          type='button'
        />
        <SubSectionHeader>Create New</SubSectionHeader>
      </SubSection>
      <div>
        <RulePageForm rulePage={{ title: '', text: '', slug: '' }} />
      </div>
    </Section>
  );
}
