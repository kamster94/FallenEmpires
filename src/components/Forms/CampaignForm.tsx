'use client';

import React, { Suspense, useState } from 'react';
import Label from '@/components/Forms/Label';
import TextInput from '@/components/Forms/TextInput';
import { NewCampaign } from '@/db/models';
import useFormHelper from '@/hooks/useFormHelper';
import Button from '@/components/Button';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { saveCampaign } from '@/app/actions';
import { useRouter } from 'next/navigation';

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
    router.push('/admin/campaigns');
  }

  return (
    <form className='flex flex-col space-y-3'>
      <div className='flex flex-col'>
        <Label>Name</Label>
        <TextInput
          value={workingCampaign.name}
          onChange={(e) => handleChangeWorkingValues({ name: e.target.value })}
        />
      </div>
      <div className='flex flex-col'>
        <Label>Slug</Label>
        <TextInput
          value={workingCampaign.slug}
          onChange={(e) => handleChangeWorkingValues({ slug: e.target.value })}
        />
      </div>
      <div className='flex flex-col'>
        <Label>Text</Label>
        <Suspense>
          <MarkdownEditor
            markdown={workingCampaign.text ?? ''}
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

export default CampaignForm;
