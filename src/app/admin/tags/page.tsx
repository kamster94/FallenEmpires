import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ButtonLink from '@/components/ButtonLink';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TagsAdminTable from '@/components/Tables/TagsAdminTable';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

export default function AdminTags() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Tags</SectionHeader>
      <div className='space-y-2'>
        <ButtonLink
          label='New Tag'
          icon={faPlus}
          route={buildRoute({
            category: RoutePath.Tags,
            slug: 'create',
            admin: true,
          })}
        />
        <TagsAdminTable />
      </div>
    </Section>
  );
}
