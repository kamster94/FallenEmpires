import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { getAncestry, getTagsByIds } from '@/app/actions';
import { notFound } from 'next/navigation';
import TagPillsList from '@/components/TagPillsList';
import MarkdownContent from '@/components/Markdown/MarkdownContent';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import NavigateBack from '@/components/NavigateBack';

export default async function AncestryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();
  const ancestry = await getAncestry(params.slug);

  if (!ancestry) {
    return notFound();
  }

  const tags = await getTagsByIds(
    ancestry.ancestriesTags.map((ancestryTag) => ancestryTag.tagId)
  );

  return (
    <Page>
      <PageHeader title={ancestry.title} />
      <Section>
        <TagPillsList
          parentId={ancestry.id}
          tags={tags}
          className='mb-4 justify-center'
        />
        <MarkdownContent className='md:px-12'>{ancestry.text}</MarkdownContent>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Rules,
            subcategory: RoutePath.Ancestries,
          })}
          label={RoutePath.Ancestries}
          type='link'
          className='mt-8 md:px-12'
        />
      </Section>
    </Page>
  );
}
