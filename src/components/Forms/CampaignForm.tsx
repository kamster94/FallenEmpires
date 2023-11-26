'use client';

import React, { Suspense, useState } from 'react';
import Label from '@/components/Forms/Label';
import TextInput from '@/components/Forms/TextInput';
import { NewCampaign } from '@/db/models';
import useFormHelper from '@/hooks/useFormHelper';
import dynamic from 'next/dynamic';
import { saveCampaign } from '@/app/actions';
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
  campaign: NewCampaign;
}

const CampaignForm = ({ campaign }: Props) => {
  const [workingCampaign, setWorkingCampaign] = useState<NewCampaign>(campaign);
  const { createSlug } = useFormHelper();
  const router = useRouter();
  const { buildRoute } = useRoute();

  function handleChangeWorkingValues({
    name,
    text,
    slug,
  }: {
    name?: string;
    text?: string;
    slug?: string;
  }) {
    setWorkingCampaign((prevState) => {
      return {
        ...prevState,
        name: name ?? prevState.name,
        text: text ?? prevState.text,
        slug: slug ?? createSlug(name) ?? prevState.slug,
      };
    });
  }

  async function handleSave() {
    await saveCampaign(workingCampaign);
    router.push(
      buildRoute({
        category: RoutePath.Campaigns,
        admin: true,
      })
    );
  }

  return (
    <Form>
      <FormSection>
        <Label>Name</Label>
        <TextInput
          value={workingCampaign.name}
          onChange={(e) => handleChangeWorkingValues({ name: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <Label>Slug</Label>
        <TextInput
          value={workingCampaign.slug}
          onChange={(e) => handleChangeWorkingValues({ slug: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <Label>Text</Label>
        <Suspense>
          <MarkdownEditor
            markdown={workingCampaign.text ?? ''}
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

export default CampaignForm;
