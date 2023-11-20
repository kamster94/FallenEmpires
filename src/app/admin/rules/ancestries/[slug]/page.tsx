import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import AncestryForm from '@/components/Forms/AncestryForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getAncestry } from '@/app/actions';

export default async function AdminAncestriesEdit({
  params,
}: {
  params: { slug: string };
}) {
  const ancestry = await getAncestry(params.slug);
  if (!ancestry) {
    return notFound();
  }

  return (
    <Section>
      <SectionHeader>Ancestries</SectionHeader>
      <div className='mb-4 flex items-center space-x-2'>
        <ButtonLink route='/admin/rules/ancestries' icon={faArrowLeft} />
        <h4 className='text-xl font-bold text-primary'>
          Editing: {ancestry.title}
        </h4>
      </div>

      <div>
        <AncestryForm ancestry={ancestry} />
      </div>
    </Section>
  );
}
