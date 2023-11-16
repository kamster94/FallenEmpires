import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ButtonLink from '@/components/ButtonLink';
import SettingPagesAdminTable from '@/components/Tables/SettingPagesAdminTable';

export default async function AdminCustomSettingPages() {
  return (
    <Section>
      <SectionHeader>Custom Setting Pages</SectionHeader>
      <div className='space-y-2'>
        <ButtonLink
          label='New Page'
          icon={faPlus}
          route='/admin/setting/custom/create'
        />
        <SettingPagesAdminTable />
      </div>
    </Section>
  );
}
