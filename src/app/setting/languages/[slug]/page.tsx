import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { getLanguage } from '@/app/actions';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/Markdown/MarkdownContent';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import NavigateBack from '@/components/NavigateBack';

export default async function LanguagePage({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();
  const language = await getLanguage(params.slug);

  if (!language) {
    return notFound();
  }

  return (
    <Page>
      <PageHeader>{language.name}</PageHeader>
      <Section>
        <MarkdownContent className='md:px-12'>
          {language.description}
        </MarkdownContent>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Languages,
          })}
          label={RoutePath.Languages}
          type='link'
          className='mt-8 md:px-12'
        />
      </Section>
    </Page>
  );
}
