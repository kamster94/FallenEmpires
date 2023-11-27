import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ButtonLink from '@/components/ButtonLink';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import LanguagesAdminTable from '@/components/Tables/LanguagesAdminTable';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

export default function AdminLanguages() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Languages</SectionHeader>
      <div className='space-y-2'>
        <ButtonLink
          label='New Language'
          icon={faPlus}
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Languages,
            slug: 'create',
            admin: true,
          })}
        />
        <LanguagesAdminTable />
      </div>
    </Section>
  );
}
