import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import SettingPageForm from '@/components/Forms/SettingPageForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function AdminCreateCustomSettingPage() {
  return (
    <Section>
      <SectionHeader>Custom Setting Pages</SectionHeader>
      <div className='mb-4 flex items-center space-x-2'>
        <ButtonLink route='/admin/setting/custom' icon={faArrowLeft} />
        <h4 className='text-xl font-bold text-primary'>Create New</h4>
      </div>
      <div>
        <SettingPageForm settingPage={{ title: '', text: '', slug: '' }} />
      </div>
    </Section>
  );
}
