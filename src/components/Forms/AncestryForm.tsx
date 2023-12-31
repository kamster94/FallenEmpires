'use client';

import React, { Suspense, useState } from 'react';
import Label from '@/components/Forms/Label';
import TextInput from '@/components/Forms/TextInput';
import { NewAncestry } from '@/db/models';
import useFormHelper from '@/hooks/useFormHelper';
import dynamic from 'next/dynamic';
import { saveAncestriesTags, saveAncestry } from '@/app/actions';
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
  ancestry: NewAncestry;
}

const AncestryForm = ({ ancestry }: Props) => {
  const [workingAncestry, setWorkingAncestry] = useState<NewAncestry>(ancestry);
  const { createSlug } = useFormHelper();
  const router = useRouter();
  const { buildRoute } = useRoute();

  function handleChangeWorkingValues({
    name,
    description,
    slug,
    tagIds,
  }: {
    name?: string;
    description?: string;
    slug?: string;
    tagIds?: number[];
  }) {
    setWorkingAncestry((prevState) => {
      return {
        ...prevState,
        name: name ?? prevState.name,
        description: description ?? prevState.description,
        slug: slug ?? createSlug(name) ?? prevState.slug,
        ancestriesTags:
          tagIds?.map((tagId) => ({
            tagId: tagId,
            ancestryId: prevState.id ?? 0,
          })) ?? prevState.ancestriesTags,
      };
    });
  }

  async function handleSave() {
    const result = (await saveAncestry(workingAncestry))[0];
    await saveAncestriesTags(
      result.id,
      workingAncestry.ancestriesTags?.map((ancestryTag) => ({
        tagId: ancestryTag.tagId,
        ancestryId:
          ancestryTag.ancestryId === 0 ? result.id : ancestryTag.ancestryId,
      })) ?? []
    );
    router.push(
      buildRoute({
        category: RoutePath.Rules,
        subcategory: RoutePath.Ancestries,
        admin: true,
      })
    );
  }

  return (
    <Form>
      <FormSection>
        <Label>Name</Label>
        <TextInput
          value={workingAncestry.name}
          onChange={(e) => handleChangeWorkingValues({ name: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <Label>Slug</Label>
        <TextInput
          value={workingAncestry.slug}
          onChange={(e) => handleChangeWorkingValues({ slug: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <Label>Tags</Label>
        <TagInput
          values={
            workingAncestry.ancestriesTags?.map(
              (ancestryTag) => ancestryTag.tagId
            ) ?? []
          }
          onChange={(tagIds) => handleChangeWorkingValues({ tagIds })}
        />
      </FormSection>
      <FormSection>
        <Label>Description</Label>
        <Suspense>
          <MarkdownEditor
            markdown={workingAncestry.description ?? ''}
            onChange={(markdown) =>
              handleChangeWorkingValues({ description: markdown })
            }
          />
        </Suspense>
      </FormSection>
      <FormFooter handleSave={handleSave} />
    </Form>
  );
};

export default AncestryForm;
