import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import HeritageForm from '@/components/Forms/HeritageForm';
import { getHeritage } from '@/app/actions';
import { RoutePath } from '@/enums';
import useRoute from '@/hooks/useRoute';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default async function AdminHeritagesEdit({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();
  const heritage = await getHeritage(params.slug);
  if (!heritage) {
    return notFound();
  }

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
        <SubSectionHeader>Editing: {heritage.title}</SubSectionHeader>
      </SubSection>

      <div>
        <HeritageForm heritage={heritage} />
      </div>
    </Section>
  );
}
