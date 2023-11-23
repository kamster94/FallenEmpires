import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ButtonLink from '@/components/ButtonLink';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AncestriesAdminTable from '@/components/Tables/AncestriesAdminTable';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

export default function AdminAncestries() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Ancestries</SectionHeader>
      <div className='space-y-2'>
        <ButtonLink
          label='New Ancestry'
          icon={faPlus}
          route={buildRoute({
            category: RoutePath.Rules,
            subcategory: RoutePath.Ancestries,
            slug: 'create',
            admin: true,
          })}
        />
        <AncestriesAdminTable />
      </div>
    </Section>
  );
}
