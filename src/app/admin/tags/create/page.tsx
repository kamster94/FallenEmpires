import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import TagForm from '@/components/Forms/TagForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function AdminCreateCustomTag() {
  return (
    <Section>
      <SectionHeader>Tags</SectionHeader>
      <div className='mb-4 flex items-center space-x-2'>
        <ButtonLink route='/admin/tags' icon={faArrowLeft} />
        <h4 className='text-xl font-bold text-primary'>Create New</h4>
      </div>
      <div>
        <TagForm tag={{ label: '', link: '' }} />
      </div>
    </Section>
  );
}
