import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import HeritageForm from '@/components/Forms/HeritageForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getHeritage } from '@/app/actions';
import { RoutePath } from '@/enums';
import useRoute from '@/hooks/useRoute';

export default async function AdminHeritagesEdit({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();
  const heritage = await getHeritage(params.slug);
  if (!heritage) {
    return notFound();
  }

  return (
    <Section>
      <SectionHeader>Heritages</SectionHeader>
      <div className='mb-4 flex items-center space-x-2'>
        <ButtonLink
          route={buildRoute({
            category: RoutePath.Rules,
            subcategory: RoutePath.Heritages,
            admin: true,
          })}
          icon={faArrowLeft}
        />
        <h4 className='text-xl font-bold text-primary'>
          Editing: {heritage.title}
        </h4>
      </div>

      <div>
        <HeritageForm heritage={heritage} />
      </div>
    </Section>
  );
}
