import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import TagForm from '@/components/Forms/TagForm';
import { getTag } from '@/app/actions';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default async function AdminTagsEdit({
  params,
}: {
  params: { id: number };
}) {
  const { buildRoute } = useRoute();

  const tag = await getTag(params.id);
  if (!tag) {
    return notFound();
  }

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
        <SubSectionHeader>Editing: {tag.label}</SubSectionHeader>
      </SubSection>

      <div>
        <TagForm tag={tag} />
      </div>
    </Section>
  );
}
