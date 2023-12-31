import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ButtonLink from '@/components/ButtonLink';
import RulePagesAdminTable from '@/components/Tables/RulePagesAdminTable';
import { RoutePath } from '@/enums';
import useRoute from '@/hooks/useRoute';

export default async function AdminCustomRulePages() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Custom Rule Pages</SectionHeader>
      <div className='space-y-2'>
        <ButtonLink
          label='New Page'
          icon={faPlus}
          route={buildRoute({
            category: RoutePath.Rules,
            subcategory: RoutePath.CustomPages,
            slug: 'create',
            admin: true,
          })}
        />
        <RulePagesAdminTable />
      </div>
    </Section>
  );
}
