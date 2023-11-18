import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import TagForm from '@/components/Forms/TagForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getTag } from '@/app/actions';

export default async function AdminTagsEdit({
  params,
}: {
  params: { id: number };
}) {
  const tag = await getTag(params.id);
  if (!tag) {
    return notFound();
  }

  return (
    <Section>
      <SectionHeader>Tags</SectionHeader>
      <div className='mb-4 flex items-center space-x-2'>
        <ButtonLink route='/admin/tags' icon={faArrowLeft} />
        <h4 className='text-xl font-bold text-primary'>Editing: {tag.label}</h4>
      </div>

      <div>
        <TagForm tag={tag} />
      </div>
    </Section>
  );
}
