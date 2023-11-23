import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import TagForm from '@/components/Forms/TagForm';
import ButtonLink from '@/components/ButtonLink';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

export default function AdminCreateCustomTag() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Tags</SectionHeader>
      <div className='mb-4 flex items-center space-x-2'>
        <ButtonLink
          route={buildRoute({
            category: RoutePath.Tags,
            admin: true,
          })}
          icon={faArrowLeft}
        />
        <h4 className='text-xl font-bold text-primary'>Create New</h4>
      </div>
      <div>
        <TagForm tag={{ label: '', link: '' }} />
      </div>
    </Section>
  );
}
