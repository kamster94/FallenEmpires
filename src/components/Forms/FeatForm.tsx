'use client';

import React, { Suspense, useState } from 'react';
import Label from '@/components/Forms/Label';
import TextInput from '@/components/Forms/TextInput';
import { NewFeat } from '@/db/models';
import useFormHelper from '@/hooks/useFormHelper';
import dynamic from 'next/dynamic';
import { saveFeatsTags, saveFeat } from '@/app/actions';
import { useRouter } from 'next/navigation';
import TagInput from '@/components/Forms/TagInput';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import Form from '@/components/Forms/Form';
import FormSection from '@/components/Forms/FormSection';
import FormFooter from '@/components/Forms/FormFooter';

const MarkdownEditor = dynamic(
  () => import('@/components/Markdown/MarkdownEditor'),
  { ssr: false }
);

interface Props {
  feat: NewFeat;
}

const FeatForm = ({ feat }: Props) => {
  const [workingFeat, setWorkingFeat] = useState<NewFeat>(feat);
  const { createSlug } = useFormHelper();
  const router = useRouter();
  const { buildRoute } = useRoute();

  function handleChangeWorkingValues({
    title,
    text,
    slug,
    tagIds,
  }: {
    title?: string;
    text?: string;
    slug?: string;
    tagIds?: number[];
  }) {
    setWorkingFeat((prevState) => {
      return {
        ...prevState,
        title: title ?? prevState.title,
        text: text ?? prevState.text,
        slug: slug ?? createSlug(title) ?? prevState.slug,
        featsTags: tagIds?.map((tagId) => ({
          tagId: tagId,
          featId: prevState.id ?? 0,
        })),
      };
    });
  }

  async function handleSave() {
    const result = (await saveFeat(workingFeat))[0];
    await saveFeatsTags(
      result.id,
      workingFeat.featsTags?.map((featTag) => ({
        tagId: featTag.tagId,
        featId: featTag.featId === 0 ? result.id : featTag.featId,
      })) ?? []
    );
    router.push(
      buildRoute({
        category: RoutePath.Rules,
        subcategory: RoutePath.Feats,
        admin: true,
      })
    );
  }

  return (
    <Form>
      <FormSection>
        <Label>Title</Label>
        <TextInput
          value={workingFeat.title}
          onChange={(e) => handleChangeWorkingValues({ title: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <Label>Slug</Label>
        <TextInput
          value={workingFeat.slug}
          onChange={(e) => handleChangeWorkingValues({ slug: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <Label>Tags</Label>
        <TagInput
          values={workingFeat.featsTags?.map((featTag) => featTag.tagId) ?? []}
          onChange={(tagIds) => handleChangeWorkingValues({ tagIds })}
        />
      </FormSection>
      <FormSection>
        <Label>Text</Label>
        <Suspense>
          <MarkdownEditor
            markdown={workingFeat.text ?? ''}
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

export default FeatForm;
