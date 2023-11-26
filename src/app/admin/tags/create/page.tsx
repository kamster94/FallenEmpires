import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import TagForm from '@/components/Forms/TagForm';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import SubSection from '@/components/SubSection';
import NavigateBack from '@/components/NavigateBack';
import SubSectionHeader from '@/components/SubSectionHeader';

export default function AdminCreateCustomTag() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Tags</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Tags,
            admin: true,
          })}
          type='button'
        />
        <SubSectionHeader>Create New</SubSectionHeader>
      </SubSection>
      <div>
        <TagForm tag={{ label: '', link: '' }} />
      </div>
    </Section>
  );
}
