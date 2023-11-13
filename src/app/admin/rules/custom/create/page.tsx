import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import RulePageForm from '@/components/Forms/RulePageForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function AdminCreateCustomRulePage() {
  return (
    <Section>
      <SectionHeader>Custom Rule Pages</SectionHeader>
      <div className="flex space-x-2 items-center mb-4">
        <ButtonLink route='/admin/rules/custom' icon={faArrowLeft} />
        <h4 className="text-primary font-bold text-xl">Create New</h4>
      </div>
      <div>
        <RulePageForm rulePage={{ title: '', text: '', slug: '' }} />
      </div>
    </Section>
  );
}
