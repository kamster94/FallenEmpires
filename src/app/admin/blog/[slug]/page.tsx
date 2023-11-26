import { notFound } from 'next/navigation';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import PostForm from '@/components/Forms/PostForm';
import { getPost } from '@/app/actions';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import SubSection from '@/components/SubSection';
import SubSectionHeader from '@/components/SubSectionHeader';
import NavigateBack from '@/components/NavigateBack';

export default async function AdminPostsEdit({
  params,
}: {
  params: { slug: string };
}) {
  const { buildRoute } = useRoute();

  const post = await getPost(params.slug);
  if (!post) {
    return notFound();
  }

  return (
    <Section>
      <SectionHeader>Posts</SectionHeader>
      <SubSection>
        <NavigateBack
          route={buildRoute({ category: RoutePath.Blog, admin: true })}
          type='button'
        />
        <SubSectionHeader>Editing: {post.title}</SubSectionHeader>
      </SubSection>

      <div>
        <PostForm post={post} />
      </div>
    </Section>
  );
}
