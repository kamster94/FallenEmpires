import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import FeatForm from '@/components/Forms/FeatForm';
import { getFeat } from '@/app/actions';
import { RoutePath } from '@/enums';
import useRoute from '@/hooks/useRoute';
import SubSection from '@/components/SubSection';
import NavigateBack from '@/components/NavigateBack';
import SubSectionHeader from '@/components/SubSectionHeader';

export default async function AdminFeatsEdit({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();
  const feat = await getFeat(params.slug);
  if (!feat) {
    return notFound();
  }

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
        <SubSectionHeader>Editing: {feat.name}</SubSectionHeader>
      </SubSection>

      <div>
        <FeatForm feat={feat} />
      </div>
    </Section>
  );
}
