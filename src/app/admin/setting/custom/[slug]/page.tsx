import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import SettingPageForm from '@/components/Forms/SettingPageForm';
import { getSettingPage } from '@/app/actions';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default async function AdminGeneralSettingsEdit({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();

  const settingPage = await getSettingPage(params.slug);
  if (!settingPage) {
    return notFound();
  }

  return (
    <Section>
      <SectionHeader>Custom Setting Pages</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.CustomPages,
            admin: true,
          })}
          type='button'
        />
        <SubSectionHeader>Editing: {settingPage.title}</SubSectionHeader>
      </SubSection>

      <div>
        <SettingPageForm settingPage={settingPage} />
      </div>
    </Section>
  );
}
