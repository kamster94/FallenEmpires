import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ButtonLink from '@/components/ButtonLink';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AncestriesAdminTable from '@/components/Tables/AncestriesAdminTable';

export default function AdminAncestries() {
  return (
    <Section>
      <SectionHeader>Ancestries</SectionHeader>
      <div className='space-y-2'>
        <ButtonLink
          label='New Ancestry'
          icon={faPlus}
          route='/admin/rules/ancestries/create'
        />
        <AncestriesAdminTable />
      </div>
    </Section>
  );
}
