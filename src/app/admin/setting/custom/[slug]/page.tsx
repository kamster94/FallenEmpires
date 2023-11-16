import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import SettingPageForm from '@/components/Forms/SettingPageForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getSettingPage } from '@/app/actions';

export default async function AdminGeneralSettingsEdit({
  params,
}: {
  params: { slug: string };
}) {
  const settingPage = await getSettingPage(params.slug);
  if (!settingPage) {
    return notFound();
  }

  return (
    <Section>
      <SectionHeader>Custom Setting Pages</SectionHeader>
      <div className='mb-4 flex items-center space-x-2'>
        <ButtonLink route='/admin/setting/custom' icon={faArrowLeft} />
        <h4 className='text-xl font-bold text-primary'>
          Editing: {settingPage.title}
        </h4>
      </div>

      <div>
        <SettingPageForm settingPage={settingPage} />
      </div>
    </Section>
  );
}
