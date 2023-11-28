import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import CultureForm from '@/components/Forms/CultureForm';
import { getCulture } from '@/app/actions';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default async function AdminCulturesEdit({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();

  const culture = await getCulture(params.slug);
  if (!culture) {
    return notFound();
  }

  return (
    <Section>
      <SectionHeader>Cultures</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Cultures,
            admin: true,
          })}
          type='button'
        />
        <SubSectionHeader>Editing: {culture.name}</SubSectionHeader>
      </SubSection>

      <div>
        <CultureForm culture={culture} />
      </div>
    </Section>
  );
}
