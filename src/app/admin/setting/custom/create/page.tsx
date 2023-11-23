import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import SettingPageForm from '@/components/Forms/SettingPageForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

export default function AdminCreateCustomSettingPage() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Custom Setting Pages</SectionHeader>
      <div className='mb-4 flex items-center space-x-2'>
        <ButtonLink
          route={buildRoute({
            category: RoutePath.Setting,
            subcategory: RoutePath.CustomPages,
            admin: true,
          })}
          icon={faArrowLeft}
        />
        <h4 className='text-xl font-bold text-primary'>Create New</h4>
      </div>
      <div>
        <SettingPageForm settingPage={{ title: '', text: '', slug: '' }} />
      </div>
    </Section>
  );
}
