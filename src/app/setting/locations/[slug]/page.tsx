import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { getLocation } from '@/app/actions';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/Markdown/MarkdownContent';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import NavigateBack from '@/components/NavigateBack';

export default async function LocationPage({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();
  const location = await getLocation(params.slug);

  if (!location) {
    return notFound();
  }

  return (
    <Page>
      <PageHeader>{location.name}</PageHeader>
      <Section>
        <MarkdownContent className='md:px-12'>
          {location.description}
        </MarkdownContent>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Locations,
          })}
          label={RoutePath.Locations}
          type='link'
          className='mt-8 md:px-12'
        />
      </Section>
    </Page>
  );
}
