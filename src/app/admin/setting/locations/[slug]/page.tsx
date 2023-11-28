import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import LocationForm from '@/components/Forms/LocationForm';
import { getLocation } from '@/app/actions';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default async function AdminLocationsEdit({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();

  const location = await getLocation(params.slug);
  if (!location) {
    return notFound();
  }

  return (
    <Section>
      <SectionHeader>Locations</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Locations,
            admin: true,
          })}
          type='button'
        />
        <SubSectionHeader>Editing: {location.name}</SubSectionHeader>
      </SubSection>

      <div>
        <LocationForm location={location} />
      </div>
    </Section>
  );
}
