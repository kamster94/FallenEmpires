import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import GeneralSettingsForm from '@/components/Forms/GeneralSettingsForm';
import { getGeneralSetting } from '@/app/actions';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default async function AdminGeneralSettingsEdit({
  params,
}: {
  params: { key: string };
}) {
  const { buildRoute } = useRoute();

  const generalSetting = await getGeneralSetting(params.key);
  if (!generalSetting) {
    return notFound();
  }

  return (
    <Section>
      <SectionHeader>GeneralSettings</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({
            category: RoutePath.GeneralSettings,
            admin: true,
          })}
          type='button'
        />
        <SubSectionHeader>Editing: {generalSetting.key}</SubSectionHeader>
      </SubSection>

      <div>
        <GeneralSettingsForm generalSetting={generalSetting} />
      </div>
    </Section>
  );
}
