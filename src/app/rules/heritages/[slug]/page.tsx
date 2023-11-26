import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { getHeritage, getTagsByIds } from '@/app/actions';
import { notFound } from 'next/navigation';
import TagPillsList from '@/components/TagPillsList';
import MarkdownContent from '@/components/Markdown/MarkdownContent';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import NavigateBack from '@/components/NavigateBack';

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
        <TagPillsList
          parentId={heritage.id}
          tags={tags}
          className='mb-4 justify-center'
        />
        <MarkdownContent>{heritage.text}</MarkdownContent>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Rules,
            subcategory: RoutePath.Heritages,
          })}
          label={RoutePath.Heritages}
          type='link'
          className='mt-8 md:px-12'
        />
      </Section>
    </Page>
  );
}
