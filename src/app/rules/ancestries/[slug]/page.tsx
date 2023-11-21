import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { getAncestry, getTagsByIds } from '@/app/actions';
import { notFound } from 'next/navigation';
import TagPillsList from '@/components/TagPillsList';
import MarkdownContent from '@/components/Markdown/MarkdownContent';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default async function AncestryPage({
  params,
}: {
  params: { slug: string };
}) {
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
        <div className='mb-4 flex justify-center'>
          <TagPillsList parentId={ancestry.id} tags={tags} />
        </div>
        <MarkdownContent>{ancestry.text}</MarkdownContent>
        <div className='mt-8 md:px-12'>
          <Link
            href='/rules/ancestries'
            className='text-gray-600 hover:text-black'
          >
            <FontAwesomeIcon icon={faArrowLeft} width={16} height={14} /> Back
            to Ancestries
          </Link>
        </div>
      </Section>
    </Page>
  );
}
