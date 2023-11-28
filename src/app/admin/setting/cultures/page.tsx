import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ButtonLink from '@/components/ButtonLink';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CulturesAdminTable from '@/components/Tables/CulturesAdminTable';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

export default function AdminCultures() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Cultures</SectionHeader>
      <div className='space-y-2'>
        <ButtonLink
          label='New Culture'
          icon={faPlus}
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Cultures,
            slug: 'create',
            admin: true,
          })}
        />
        <CulturesAdminTable />
      </div>
    </Section>
  );
}
