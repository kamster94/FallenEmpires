import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ButtonLink from '@/components/ButtonLink';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FeatsAdminTable from '@/components/Tables/FeatsAdminTable';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

export default function AdminFeats() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Feats</SectionHeader>
      <div className='space-y-2'>
        <ButtonLink
          label='New Feat'
          icon={faPlus}
          route={buildRoute({
            category: RoutePath.Rules,
            subcategory: RoutePath.Feats,
            slug: 'create',
            admin: true,
          })}
        />
        <FeatsAdminTable />
      </div>
    </Section>
  );
}
