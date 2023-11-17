import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import GeneralSettingsForm from '@/components/Forms/GeneralSettingsForm';

export default function AdminGeneralSettings() {
  return (
    <Section>
      <SectionHeader>General Settings</SectionHeader>
      <GeneralSettingsForm />
    </Section>
  );
}
