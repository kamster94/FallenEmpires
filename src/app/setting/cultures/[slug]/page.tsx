import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { getCulture } from '@/app/actions';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/Markdown/MarkdownContent';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import NavigateBack from '@/components/NavigateBack';

export default async function CulturePage({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();
  const culture = await getCulture(params.slug);

  if (!culture) {
    return notFound();
  }

  return (
    <Page>
      <PageHeader>{culture.name}</PageHeader>
      <Section>
        <MarkdownContent className='md:px-12'>
          {culture.description}
        </MarkdownContent>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Cultures,
          })}
          label={RoutePath.Cultures}
          type='link'
          className='mt-8 md:px-12'
        />
      </Section>
    </Page>
  );
}
