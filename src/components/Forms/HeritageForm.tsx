'use client';

import React, { Suspense, useState } from 'react';
import Label from '@/components/Forms/Label';
import TextInput from '@/components/Forms/TextInput';
import { NewHeritage } from '@/db/models';
import useFormHelper from '@/hooks/useFormHelper';
import dynamic from 'next/dynamic';
import { saveHeritagesTags, saveHeritage } from '@/app/actions';
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
  heritage: NewHeritage;
}

const HeritageForm = ({ heritage }: Props) => {
  const [workingHeritage, setWorkingHeritage] = useState<NewHeritage>(heritage);
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
    setWorkingHeritage((prevState) => {
      return {
        ...prevState,
        name: name ?? prevState.name,
        description: description ?? prevState.description,
        slug: slug ?? createSlug(name) ?? prevState.slug,
        heritagesTags:
          tagIds?.map((tagId) => ({
            tagId: tagId,
            heritageId: prevState.id ?? 0,
          })) ?? prevState.heritagesTags,
      };
    });
  }

  async function handleSave() {
    const result = (await saveHeritage(workingHeritage))[0];
    await saveHeritagesTags(
      result.id,
      workingHeritage.heritagesTags?.map((heritageTag) => ({
        tagId: heritageTag.tagId,
        heritageId:
          heritageTag.heritageId === 0 ? result.id : heritageTag.heritageId,
      })) ?? []
    );
    router.push(
      buildRoute({
        category: RoutePath.Rules,
        subcategory: RoutePath.Heritages,
        admin: true,
      })
    );
  }

  return (
    <Form>
      <FormSection>
        <Label>Name</Label>
        <TextInput
          value={workingHeritage.name}
          onChange={(e) => handleChangeWorkingValues({ name: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <Label>Slug</Label>
        <TextInput
          value={workingHeritage.slug}
          onChange={(e) => handleChangeWorkingValues({ slug: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <Label>Tags</Label>
        <TagInput
          values={
            workingHeritage.heritagesTags?.map(
              (heritageTag) => heritageTag.tagId
            ) ?? []
          }
          onChange={(tagIds) => handleChangeWorkingValues({ tagIds })}
        />
      </FormSection>
      <FormSection>
        <Label>Description</Label>
        <Suspense>
          <MarkdownEditor
            markdown={workingHeritage.description ?? ''}
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

export default HeritageForm;
