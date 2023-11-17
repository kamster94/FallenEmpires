'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Label from '@/components/Forms/Label';
import Button from '@/components/Button';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { NewGeneralSetting } from '@/db/models';
import { getGeneralSetting, saveGeneralSetting } from '@/app/actions';
import { GeneralSettingKey } from '@/enums';

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
    <form className='flex flex-col space-y-3'>
      <div className='flex flex-col'>
        <Label>Home Page Text</Label>
        <Suspense>
          <MarkdownEditor
            markdown={workingHomePageText.value ?? ''}
            onChange={(markdown) =>
              handleChangeWorkingHomePageTextValues({ value: markdown })
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

export default GeneralSettingsForm;
