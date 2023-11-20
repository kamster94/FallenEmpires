'use client';

import React, { Suspense, useState } from 'react';
import Label from '@/components/Forms/Label';
import TextInput from '@/components/Forms/TextInput';
import { NewAncestry } from '@/db/models';
import useFormHelper from '@/hooks/useFormHelper';
import Button from '@/components/Button';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { saveAncestriesTags, saveAncestry } from '@/app/actions';
import { useRouter } from 'next/navigation';
import TagInput from '@/components/Forms/TagInput';

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
    setWorkingAncestry((prevState) => {
      return {
        ...prevState,
        title: title ?? prevState.title,
        text: text ?? prevState.text,
        slug: slug ?? createSlug(title) ?? prevState.slug,
        ancestriesTags: tagIds?.map((tagId) => ({
          tagId: tagId,
          ancestryId: prevState.id ?? 0,
        })),
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
    router.push('/admin/rules/ancestries');
  }

  return (
    <form className='flex flex-col space-y-3'>
      <div className='flex flex-col'>
        <Label>Title</Label>
        <TextInput
          value={workingAncestry.title}
          onChange={(e) => handleChangeWorkingValues({ title: e.target.value })}
        />
      </div>
      <div className='flex flex-col'>
        <Label>Slug</Label>
        <TextInput
          value={workingAncestry.slug}
          onChange={(e) => handleChangeWorkingValues({ slug: e.target.value })}
        />
      </div>
      <div className='flex flex-col'>
        <Label>Tags</Label>
        <TagInput
          values={
            workingAncestry.ancestriesTags?.map(
              (ancestryTag) => ancestryTag.tagId
            ) ?? []
          }
          onChange={(tagIds) => handleChangeWorkingValues({ tagIds })}
        />
      </div>
      <div className='flex flex-col'>
        <Label>Text</Label>
        <Suspense>
          <MarkdownEditor
            markdown={workingAncestry.text ?? ''}
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

export default AncestryForm;
