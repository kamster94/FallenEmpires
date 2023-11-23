import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import RulePageForm from '@/components/Forms/RulePageForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { RoutePath } from '@/enums';
import useRoute from '@/hooks/useRoute';

export default function AdminCreateCustomRulePage() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Custom Rule Pages</SectionHeader>
      <div className='mb-4 flex items-center space-x-2'>
        <ButtonLink
          route={buildRoute({
            category: RoutePath.Rules,
            subcategory: RoutePath.CustomPages,
            admin: true,
          })}
          icon={faArrowLeft}
        />
        <h4 className='text-xl font-bold text-primary'>Create New</h4>
      </div>
      <div>
        <RulePageForm rulePage={{ title: '', text: '', slug: '' }} />
      </div>
    </Section>
  );
}
