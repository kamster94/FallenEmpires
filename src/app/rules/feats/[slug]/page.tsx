import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { getFeat, getTagsByIds } from '@/app/actions';
import { notFound } from 'next/navigation';
import TagPillsList from '@/components/TagPillsList';
import MarkdownContent from '@/components/Markdown/MarkdownContent';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import NavigateBack from '@/components/NavigateBack';

export default async function FeatPage({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();
  const feat = await getFeat(params.slug);

  if (!feat) {
    return notFound();
  }

  const tags = await getTagsByIds(
    feat.featsTags.map((featTag) => featTag.tagId)
  );

  return (
    <Page>
      <PageHeader title={feat.title} />
      <Section>
        <TagPillsList
          parentId={feat.id}
          tags={tags}
          className='mb-4 justify-center'
        />
        <MarkdownContent className='md:px-12'>{feat.text}</MarkdownContent>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Rules,
            subcategory: RoutePath.Feats,
          })}
          label={RoutePath.Feats}
          type='link'
          className='mt-8 md:px-12'
        />
      </Section>
    </Page>
  );
}
