import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ButtonLink from '@/components/ButtonLink';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TagsAdminTable from '@/components/Tables/TagsAdminTable';

export default function AdminTags() {
  return (
    <Section>
      <SectionHeader>Tags</SectionHeader>
      <div className='space-y-2'>
        <ButtonLink label='New Tag' icon={faPlus} route='/admin/tags/create' />
        <TagsAdminTable />
      </div>
    </Section>
  );
}
