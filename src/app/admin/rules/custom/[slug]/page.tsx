import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import RulePageForm from '@/components/Forms/RulePageForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getRulePage } from '@/app/actions';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

export default async function AdminGeneralRulesEdit({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();

  const rulePage = await getRulePage(params.slug);
  if (!rulePage) {
    return notFound();
  }

  return (
    <Section>
      <SectionHeader>Custom Rule Pages</SectionHeader>
      <div className='mb-4 flex items-center space-x-2'>
        <ButtonLink
          route={buildRoute({
            category: RoutePath.Rules,
            subcategory: RoutePath.CustomPages,
            admin: true,
          })}
          icon={faArrowLeft}
        />
        <h4 className='text-xl font-bold text-primary'>
          Editing: {rulePage.title}
        </h4>
      </div>

      <div>
        <RulePageForm rulePage={rulePage} />
      </div>
    </Section>
  );
}
