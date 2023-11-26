'use client';

import React, { Suspense, useState } from 'react';
import Label from '@/components/Forms/Label';
import TextInput from '@/components/Forms/TextInput';
import { NewPost } from '@/db/models';
import useFormHelper from '@/hooks/useFormHelper';
import dynamic from 'next/dynamic';
import { savePost } from '@/app/actions';
import { useRouter } from 'next/navigation';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import Form from '@/components/Forms/Form';
import FormSection from '@/components/Forms/FormSection';
import FormFooter from '@/components/Forms/FormFooter';
import { useUser } from '@auth0/nextjs-auth0/client';

const MarkdownEditor = dynamic(
  () => import('@/components/Markdown/MarkdownEditor'),
  { ssr: false }
);

interface Props {
  post: NewPost;
}

const PostForm = ({ post }: Props) => {
  const [workingPost, setWorkingPost] = useState<NewPost>(post);
  const { createSlug } = useFormHelper();
  const router = useRouter();
  const { buildRoute } = useRoute();
  const { user, isLoading } = useUser();

  function handleChangeWorkingValues({
    title,
    text,
    slug,
  }: {
    title?: string;
    text?: string;
    slug?: string;
  }) {
    setWorkingPost((prevState) => {
      return {
        ...prevState,
        title: title ?? prevState.title,
        text: text ?? prevState.text,
        slug: slug ?? createSlug(title) ?? prevState.slug,
      };
    });
  }

  async function handleSave() {
    await savePost({
      ...workingPost,
      author: user?.nickname ?? '',
      date: new Date(),
    });
    router.push(
      buildRoute({
        category: RoutePath.Blog,
        admin: true,
      })
    );
  }

  if (isLoading) {
    return null;
  }

  return (
    <Form>
      <FormSection>
        <Label>Name</Label>
        <TextInput
          value={workingPost.title}
          onChange={(e) => handleChangeWorkingValues({ title: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <Label>Slug</Label>
        <TextInput
          value={workingPost.slug}
          onChange={(e) => handleChangeWorkingValues({ slug: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <Label>Text</Label>
        <Suspense>
          <MarkdownEditor
            markdown={workingPost.text ?? ''}
            onChange={(markdown) =>
              handleChangeWorkingValues({ text: markdown })
            }
          />
        </Suspense>
      </FormSection>
      <FormFooter handleSave={handleSave} />
    </Form>
  );
};

export default PostForm;
