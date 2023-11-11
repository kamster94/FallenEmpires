import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import SettingPageForm from '@/components/Forms/SettingPageForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function AdminCreateCustomSettingPage() {
  return (
    <Section>
      <SectionHeader>Custom Setting Pages</SectionHeader>
      <div className="flex space-x-2 items-center mb-4">
        <ButtonLink route='/admin/setting/custom' icon={faArrowLeft} />
        <h4 className="text-primary font-bold text-xl">Create New</h4>
      </div>
      <div>
        <SettingPageForm settingPage={{ title: '', text: '', slug: '' }} />
      </div>
    </Section>
  );
}
