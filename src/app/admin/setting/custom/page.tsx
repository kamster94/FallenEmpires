import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ButtonLink from '@/components/ButtonLink';
import SettingPagesAdminTable from '@/components/Tables/SettingPagesAdminTable';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

export default async function AdminCustomSettingPages() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Custom Setting Pages</SectionHeader>
      <div className='space-y-2'>
        <ButtonLink
          label='New Page'
          icon={faPlus}
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.CustomPages,
            slug: 'create',
            admin: true,
          })}
        />
        <SettingPagesAdminTable />
      </div>
    </Section>
  );
}
