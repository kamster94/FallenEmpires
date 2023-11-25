'use client';

import React, { Suspense, useState } from 'react';
import Label from '@/components/Forms/Label';
import TextInput from '@/components/Forms/TextInput';
import { NewHeritage } from '@/db/models';
import useFormHelper from '@/hooks/useFormHelper';
import Button from '@/components/Button';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { saveHeritagesTags, saveHeritage } from '@/app/actions';
import { useRouter } from 'next/navigation';
import TagInput from '@/components/Forms/TagInput';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

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
    setWorkingHeritage((prevState) => {
      return {
        ...prevState,
        title: title ?? prevState.title,
        text: text ?? prevState.text,
        slug: slug ?? createSlug(title) ?? prevState.slug,
        heritagesTags: tagIds?.map((tagId) => ({
          tagId: tagId,
          heritageId: prevState.id ?? 0,
        })),
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
    <form className='flex flex-col space-y-3'>
      <div className='flex flex-col'>
        <Label>Title</Label>
        <TextInput
          value={workingHeritage.title}
          onChange={(e) => handleChangeWorkingValues({ title: e.target.value })}
        />
      </div>
      <div className='flex flex-col'>
        <Label>Slug</Label>
        <TextInput
          value={workingHeritage.slug}
          onChange={(e) => handleChangeWorkingValues({ slug: e.target.value })}
        />
      </div>
      <div className='flex flex-col'>
        <Label>Tags</Label>
        <TagInput
          values={
            workingHeritage.heritagesTags?.map(
              (heritageTag) => heritageTag.tagId
            ) ?? []
          }
          onChange={(tagIds) => handleChangeWorkingValues({ tagIds })}
        />
      </div>
      <div className='flex flex-col'>
        <Label>Text</Label>
        <Suspense>
          <MarkdownEditor
            markdown={workingHeritage.text ?? ''}
            onChange={(markdown) =>
              handleChangeWorkingValues({ text: markdown })
            }
          />
        </Suspense>
      </div>
      <div className='flex justify-end'>
        <Button label='Save' icon={faSave} onClick={handleSave} />
      </div>
    </form>
  );
};

export default HeritageForm;