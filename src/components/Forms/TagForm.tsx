'use client';

import React, { useState } from 'react';
import Label from '@/components/Forms/Label';
import TextInput from '@/components/Forms/TextInput';
import { NewTag } from '@/db/models';
import { saveTag } from '@/app/actions';
import { useRouter } from 'next/navigation';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';
import Form from '@/components/Forms/Form';
import FormSection from '@/components/Forms/FormSection';
import FormFooter from '@/components/Forms/FormFooter';

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
    <Form>
      <FormSection>
        <Label>Label</Label>
        <TextInput
          value={workingTag.label}
          onChange={(e) => handleChangeWorkingValues({ label: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <Label>Link</Label>
        <TextInput
          value={workingTag.link ?? undefined}
          onChange={(e) => handleChangeWorkingValues({ link: e.target.value })}
        />
      </FormSection>
      <FormFooter handleSave={handleSave} />
    </Form>
  );
};

export default TagForm;
