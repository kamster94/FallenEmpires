import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import LanguageForm from '@/components/Forms/LanguageForm';
import { getLanguage } from '@/app/actions';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default async function AdminLanguagesEdit({
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
    <Section>
      <SectionHeader>Languages</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.Languages,
            admin: true,
          })}
          type='button'
        />
        <SubSectionHeader>Editing: {language.title}</SubSectionHeader>
      </SubSection>

      <div>
        <LanguageForm language={language} />
      </div>
    </Section>
  );
}
