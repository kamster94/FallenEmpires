import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import AncestryForm from '@/components/Forms/AncestryForm';
import { getAncestry } from '@/app/actions';
import { RoutePath } from '@/enums';
import useRoute from '@/hooks/useRoute';
import SubSection from '@/components/SubSection';
import NavigateBack from '@/components/NavigateBack';
import SubSectionHeader from '@/components/SubSectionHeader';

export default async function AdminAncestriesEdit({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();
  const ancestry = await getAncestry(params.slug);
  if (!ancestry) {
    return notFound();
  }

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
        <SubSectionHeader>Editing: {ancestry.title}</SubSectionHeader>
      </SubSection>

      <div>
        <AncestryForm ancestry={ancestry} />
      </div>
    </Section>
  );
}
