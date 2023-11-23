import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import AncestryForm from '@/components/Forms/AncestryForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getAncestry } from '@/app/actions';
import { RoutePath } from '@/enums';
import useRoute from '@/hooks/useRoute';

export default async function AdminAncestriesEdit({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();
  const ancestry = await getAncestry(params.slug);
  if (!ancestry) {
    return notFound();
  }

  return (
    <Section>
      <SectionHeader>Ancestries</SectionHeader>
      <div className='mb-4 flex items-center space-x-2'>
        <ButtonLink
          route={buildRoute({
            category: RoutePath.Rules,
            subcategory: RoutePath.Ancestries,
            admin: true,
          })}
          icon={faArrowLeft}
        />
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
