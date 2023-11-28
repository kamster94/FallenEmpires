'use client';

import React, { Suspense, useState } from 'react';
import Label from '@/components/Forms/Label';
import dynamic from 'next/dynamic';
import { GeneralSetting } from '@/db/models';
import { saveGeneralSetting } from '@/app/actions';
import Form from '@/components/Forms/Form';
import FormSection from '@/components/Forms/FormSection';
import FormFooter from '@/components/Forms/FormFooter';
import { useRouter } from 'next/navigation';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

const MarkdownEditor = dynamic(
  () => import('@/components/Markdown/MarkdownEditor'),
  { ssr: false }
);

interface Props {
  generalSetting: GeneralSetting;
}

const GeneralSettingsForm = ({ generalSetting }: Props) => {
  const router = useRouter();
  const { buildRoute } = useRoute();
  const [workingGeneralSetting, setWorkingGeneralSetting] =
    useState<GeneralSetting>(generalSetting);

  function handleChangeWorkingHomePageTextValues({ value }: { value: string }) {
    setWorkingGeneralSetting((prevState) => {
      return {
        ...prevState,
        value,
      };
    });
  }

  async function handleSave() {
    await saveGeneralSetting(workingGeneralSetting);
    router.push(
      buildRoute({
        category: RoutePath.GeneralSettings,
        admin: true,
      })
    );
  }

  return (
    <Form>
      <FormSection>
        <Label>Home Page Text</Label>
        <Suspense>
          <MarkdownEditor
            markdown={workingGeneralSetting.value ?? ''}
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
