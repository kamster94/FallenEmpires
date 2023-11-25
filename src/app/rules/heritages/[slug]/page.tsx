import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { getHeritage, getTagsByIds } from '@/app/actions';
import { notFound } from 'next/navigation';
import TagPillsList from '@/components/TagPillsList';
import MarkdownContent from '@/components/Markdown/MarkdownContent';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

export default async function HeritagePage({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();
  const heritage = await getHeritage(params.slug);

  if (!heritage) {
    return notFound();
  }

  const tags = await getTagsByIds(
    heritage.heritagesTags.map((heritageTag) => heritageTag.tagId)
  );

  return (
    <Page>
      <PageHeader title={heritage.title} />
      <Section>
        <div className='mb-4 flex justify-center'>
          <TagPillsList parentId={heritage.id} tags={tags} />
        </div>
        <MarkdownContent>{heritage.text}</MarkdownContent>
        <div className='mt-8 md:px-12'>
          <Link
            href={buildRoute({
              category: RoutePath.Rules,
              subcategory: RoutePath.Heritages,
            })}
            className='text-gray-600 hover:text-black'
          >
            <FontAwesomeIcon icon={faArrowLeft} width={16} height={14} /> Back
            to Heritages
          </Link>
        </div>
      </Section>
    </Page>
  );
}
