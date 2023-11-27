import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ButtonLink from '@/components/ButtonLink';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import BackgroundsAdminTable from '@/components/Tables/BackgroundsAdminTable';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

export default function AdminBackgrounds() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Backgrounds</SectionHeader>
      <div className='space-y-2'>
        <ButtonLink
          label='New Background'
          icon={faPlus}
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Backgrounds,
            slug: 'create',
            admin: true,
          })}
        />
        <BackgroundsAdminTable />
      </div>
    </Section>
  );
}
