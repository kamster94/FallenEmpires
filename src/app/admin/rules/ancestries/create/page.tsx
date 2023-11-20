import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import AncestryForm from '@/components/Forms/AncestryForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function AdminCreateAncestry() {
  return (
    <Section>
      <SectionHeader>Ancestries</SectionHeader>
      <div className='mb-4 flex items-center space-x-2'>
        <ButtonLink route='/admin/rules/ancestries' icon={faArrowLeft} />
        <h4 className='text-xl font-bold text-primary'>Create New</h4>
      </div>
      <div>
        <AncestryForm ancestry={{ title: '', text: '', slug: '' }} />
      </div>
    </Section>
  );
}
