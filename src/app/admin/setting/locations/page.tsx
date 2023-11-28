import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ButtonLink from '@/components/ButtonLink';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import LocationsAdminTable from '@/components/Tables/LocationsAdminTable';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

export default function AdminLocations() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Locations</SectionHeader>
      <div className='space-y-2'>
        <ButtonLink
          label='New Location'
          icon={faPlus}
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Locations,
            slug: 'create',
            admin: true,
          })}
        />
        <LocationsAdminTable />
      </div>
    </Section>
  );
}
