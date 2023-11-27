'use client';

import React, { Suspense, useState } from 'react';
import Label from '@/components/Forms/Label';
import TextInput from '@/components/Forms/TextInput';
import { NewLanguage } from '@/db/models';
import useFormHelper from '@/hooks/useFormHelper';
import dynamic from 'next/dynamic';
import { saveLanguage } from '@/app/actions';
import { useRouter } from 'next/navigation';
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
  language: NewLanguage;
}

const LanguageForm = ({ language }: Props) => {
  const [workingLanguage, setWorkingLanguage] = useState<NewLanguage>(language);
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
    setWorkingLanguage((prevState) => {
      return {
        ...prevState,
        title: title ?? prevState.title,
        text: text ?? prevState.text,
        slug: slug ?? createSlug(title) ?? prevState.slug,
      };
    });
  }

  async function handleSave() {
    await saveLanguage(workingLanguage);
    router.push(
      buildRoute({
        category: RoutePath.Setting,
        subcategory: RoutePath.Languages,
        admin: true,
      })
    );
  }

  return (
    <Form>
      <FormSection>
        <Label>Title</Label>
        <TextInput
          value={workingLanguage.title}
          onChange={(e) => handleChangeWorkingValues({ title: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <Label>Slug</Label>
        <TextInput
          value={workingLanguage.slug}
          onChange={(e) => handleChangeWorkingValues({ slug: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <Label>Text</Label>
        <Suspense>
          <MarkdownEditor
            markdown={workingLanguage.text ?? ''}
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

export default LanguageForm;
