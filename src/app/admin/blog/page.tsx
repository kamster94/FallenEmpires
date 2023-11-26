import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ButtonLink from '@/components/ButtonLink';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PostsAdminTable from '@/components/Tables/PostsAdminTable';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

export default function AdminBlog() {
  const { buildRoute } = useRoute();

  return (
    <Section>
      <SectionHeader>Blog</SectionHeader>
      <div className='space-y-2'>
        <ButtonLink
          label='New Post'
          icon={faPlus}
          route={buildRoute({
            category: RoutePath.Blog,
            slug: 'create',
            admin: true,
          })}
        />
        <PostsAdminTable />
      </div>
    </Section>
  );
}
