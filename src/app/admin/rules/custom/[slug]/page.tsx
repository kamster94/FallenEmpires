import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import RulePageForm from '@/components/Forms/RulePageForm';
import { getRulePage } from '@/app/actions';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default async function AdminGeneralRulesEdit({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();

  const rulePage = await getRulePage(params.slug);
  if (!rulePage) {
    return notFound();
  }

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
        <SubSectionHeader>Editing: {rulePage.title}</SubSectionHeader>
      </SubSection>

      <div>
        <RulePageForm rulePage={rulePage} />
      </div>
    </Section>
  );
}
