'use client';

import React, { useEffect, useState } from 'react';
import { deletePost, getAllPosts } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import { Post } from '@/db/models';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

const PostsAdminTable = () => {
  const { buildRoute } = useRoute();
  const [posts, setPosts] = useState<Post[]>([]);

  async function refresh() {
    setPosts(await getAllPosts());
  }
  const headers = ['Title', 'Slug', 'Author', 'Published'];

  useEffect(() => {
    getAllPosts().then((loadedPosts) => {
      setPosts(loadedPosts);
    });
  }, []);

  async function handleDelete(id: number) {
    await deletePost(id);
    await refresh();
  }

  const rows: Row[] = posts.map((post) => {
    return {
      cells: [
        post.title,
        post.slug,
        post.author,
        post.date.toLocaleDateString('en-us', {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      ],
      actions: (
        <TableActions
          editRoute={buildRoute({
            category: RoutePath.Blog,
            slug: post.slug,
            admin: true,
          })}
          deleteAction={() => handleDelete(post.id)}
        />
      ),
    };
  });

  return <DataTable headers={headers} rows={rows} />;
};

export default PostsAdminTable;
