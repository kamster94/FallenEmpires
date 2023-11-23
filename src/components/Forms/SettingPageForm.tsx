'use client';

import React, { Suspense, useState } from 'react';
import Label from '@/components/Forms/Label';
import TextInput from '@/components/Forms/TextInput';
import { NewSettingPage } from '@/db/models';
import useFormHelper from '@/hooks/useFormHelper';
import Button from '@/components/Button';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { saveSettingPage } from '@/app/actions';
import { useRouter } from 'next/navigation';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

const MarkdownEditor = dynamic(
  () => import('@/components/Markdown/MarkdownEditor'),
  { ssr: false }
);

interface Props {
  settingPage: NewSettingPage;
}

const SettingPageForm = ({ settingPage }: Props) => {
  const [workingSettingPage, setWorkingSettingPage] =
    useState<NewSettingPage>(settingPage);
  const { createSlug } = useFormHelper();
  const router = useRouter();
  const { buildRoute } = useRoute();

  function handleChangeWorkingValues({
    title,
    text,
    slug,
  }: {
    title?: string;
    text?: string;
    slug?: string;
  }) {
    setWorkingSettingPage((prevState) => {
      return {
        ...prevState,
        title: title ?? prevState.title,
        text: text ?? prevState.text,
        slug: slug ?? createSlug(title) ?? prevState.slug,
      };
    });
  }

  async function handleSave() {
    await saveSettingPage(workingSettingPage);
    router.push(
      buildRoute({
        category: RoutePath.Setting,
        subcategory: RoutePath.CustomPages,
        admin: true,
      })
    );
  }

  return (
    <form className='flex flex-col space-y-3'>
      <div className='flex flex-col'>
        <Label>Title</Label>
        <TextInput
          value={workingSettingPage.title}
          onChange={(e) => handleChangeWorkingValues({ title: e.target.value })}
        />
      </div>
      <div className='flex flex-col'>
        <Label>Slug</Label>
        <TextInput
          value={workingSettingPage.slug}
          onChange={(e) => handleChangeWorkingValues({ slug: e.target.value })}
        />
      </div>
      <div className='flex flex-col'>
        <Label>Text</Label>
        <Suspense>
          <MarkdownEditor
            markdown={workingSettingPage.text ?? ''}
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

export default SettingPageForm;
