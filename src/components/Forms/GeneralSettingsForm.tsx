'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Label from '@/components/Forms/Label';
import dynamic from 'next/dynamic';
import { NewGeneralSetting } from '@/db/models';
import { getGeneralSetting, saveGeneralSetting } from '@/app/actions';
import { GeneralSettingKey } from '@/enums';
import Form from '@/components/Forms/Form';
import FormSection from '@/components/Forms/FormSection';
import FormFooter from '@/components/Forms/FormFooter';

const MarkdownEditor = dynamic(
  () => import('@/components/Markdown/MarkdownEditor'),
  { ssr: false }
);

const GeneralSettingsForm = () => {
  const homePageText: NewGeneralSetting = {
    key: GeneralSettingKey.HomePageText,
    value: '',
  };
  const [workingHomePageText, setWorkingHomePageText] =
    useState<NewGeneralSetting>(homePageText);

  useEffect(() => {
    getGeneralSetting(GeneralSettingKey.HomePageText).then(
      (homePageTextSetting) => {
        if (homePageTextSetting) {
          setWorkingHomePageText(homePageTextSetting);
        }
      }
    );
  }, []);

  function handleChangeWorkingHomePageTextValues({ value }: { value: string }) {
    setWorkingHomePageText((prevState) => {
      return {
        ...prevState,
        value,
      };
    });
  }

  async function handleSave() {
    await saveGeneralSetting(workingHomePageText);
  }

  return (
    <Form>
      <FormSection>
        <Label>Home Page Text</Label>
        <Suspense>
          <MarkdownEditor
            markdown={workingHomePageText.value ?? ''}
            onChange={(markdown) =>
              handleChangeWorkingHomePageTextValues({ value: markdown })
            }
          />
        </Suspense>
      </FormSection>
      <FormFooter handleSave={handleSave} />
    </Form>
  );
};

export default GeneralSettingsForm;
