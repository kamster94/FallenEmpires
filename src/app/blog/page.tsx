import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import { getAllPosts } from '@/app/actions';
import BlogPost from '@/components/BlogPost';

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <Page>
      <PageHeader title='Blog' />
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </Page>
  );
}
