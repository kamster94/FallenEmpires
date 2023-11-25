import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ButtonLink from '@/components/ButtonLink';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import HeritagesAdminTable from '@/components/Tables/HeritagesAdminTable';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

export default function AdminHeritages() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Heritages</SectionHeader>
      <div className='space-y-2'>
        <ButtonLink
          label='New Heritage'
          icon={faPlus}
          route={buildRoute({
            category: RoutePath.Rules,
            subcategory: RoutePath.Heritages,
            slug: 'create',
            admin: true,
          })}
        />
        <HeritagesAdminTable />
      </div>
    </Section>
  );
}
