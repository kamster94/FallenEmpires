'use client';

import React, { useState } from 'react';
import Label from '@/components/Forms/Label';
import TextInput from '@/components/Forms/TextInput';
import { NewTag } from '@/db/models';
import Button from '@/components/Button';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { saveTag } from '@/app/actions';
import { useRouter } from 'next/navigation';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

interface Props {
  tag: NewTag;
}

const TagForm = ({ tag }: Props) => {
  const [workingTag, setWorkingTag] = useState<NewTag>(tag);
  const router = useRouter();
  const { buildRoute } = useRoute();

  function handleChangeWorkingValues({
    label,
    link,
  }: {
    label?: string;
    link?: string;
  }) {
    setWorkingTag((prevState) => {
      return {
        ...prevState,
        label: label ?? prevState.label,
        link: link ?? prevState.link,
      };
    });
  }

  async function handleSave() {
    await saveTag(workingTag);
    router.push(
      buildRoute({
        category: RoutePath.Tags,
        admin: true,
      })
    );
  }

  return (
    <form className='flex flex-col space-y-3'>
      <div className='flex flex-col'>
        <Label>Label</Label>
        <TextInput
          value={workingTag.label}
          onChange={(e) => handleChangeWorkingValues({ label: e.target.value })}
        />
      </div>
      <div className='flex flex-col'>
        <Label>Link</Label>
        <TextInput
          value={workingTag.link ?? undefined}
          onChange={(e) => handleChangeWorkingValues({ link: e.target.value })}
        />
      </div>
      <div className='flex justify-end'>
        <Button label='Save' icon={faSave} onClick={handleSave} />
      </div>
    </form>
  );
};

export default TagForm;
