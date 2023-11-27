import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { getBackground } from '@/app/actions';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/Markdown/MarkdownContent';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import NavigateBack from '@/components/NavigateBack';

export default async function BackgroundPage({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();
  const background = await getBackground(params.slug);

  if (!background) {
    return notFound();
  }

  return (
    <Page>
      <PageHeader>{background.name}</PageHeader>
      <Section>
        <MarkdownContent className='md:px-12'>
          {background.description}
        </MarkdownContent>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Backgrounds,
          })}
          label={RoutePath.Backgrounds}
          type='link'
          className='mt-8 md:px-12'
        />
      </Section>
    </Page>
  );
}
