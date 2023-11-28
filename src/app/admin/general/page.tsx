import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import GeneralSettingsAdminTable from '@/components/Tables/GeneralSettingsAdminTable';

export default function AdminGeneralSettings() {
  return (
    <Section>
      <SectionHeader>GeneralSettings</SectionHeader>
      <div className='space-y-2'>
        <GeneralSettingsAdminTable />
      </div>
    </Section>
  );
}
