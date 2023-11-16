import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ButtonLink from '@/components/ButtonLink';
import RulePagesAdminTable from '@/components/Tables/RulePagesAdminTable';

export default async function AdminCustomRulePages() {
  return (
    <Section>
      <SectionHeader>Custom Rule Pages</SectionHeader>
      <div className='space-y-2'>
        <ButtonLink
          label='New Page'
          icon={faPlus}
          route='/admin/rules/custom/create'
        />
        <RulePagesAdminTable />
      </div>
    </Section>
  );
}
