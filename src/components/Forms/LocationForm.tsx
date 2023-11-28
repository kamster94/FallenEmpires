'use client';

import React, { Suspense, useState } from 'react';
import Label from '@/components/Forms/Label';
import TextInput from '@/components/Forms/TextInput';
import { NewLocation } from '@/db/models';
import useFormHelper from '@/hooks/useFormHelper';
import dynamic from 'next/dynamic';
import { saveLocation } from '@/app/actions';
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
  location: NewLocation;
}

const LocationForm = ({ location }: Props) => {
  const [workingLocation, setWorkingLocation] = useState<NewLocation>(location);
  const { createSlug } = useFormHelper();
  const router = useRouter();
  const { buildRoute } = useRoute();

  function handleChangeWorkingValues({
    name,
    description,
    slug,
  }: {
    name?: string;
    description?: string;
    slug?: string;
  }) {
    setWorkingLocation((prevState) => {
      return {
        ...prevState,
        name: name ?? prevState.name,
        description: description ?? prevState.description,
        slug: slug ?? createSlug(name) ?? prevState.slug,
      };
    });
  }

  async function handleSave() {
    await saveLocation(workingLocation);
    router.push(
      buildRoute({
        category: RoutePath.Setting,
        subcategory: RoutePath.Locations,
        admin: true,
      })
    );
  }

  return (
    <Form>
      <FormSection>
        <Label>Name</Label>
        <TextInput
          value={workingLocation.name}
          onChange={(e) => handleChangeWorkingValues({ name: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <Label>Slug</Label>
        <TextInput
          value={workingLocation.slug}
          onChange={(e) => handleChangeWorkingValues({ slug: e.target.value })}
        />
      </FormSection>
      <FormSection>
        <Label>Description</Label>
        <Suspense>
          <MarkdownEditor
            markdown={workingLocation.description ?? ''}
            onChange={(markdown) =>
              handleChangeWorkingValues({ description: markdown })
            }
          />
        </Suspense>
      </FormSection>
      <FormFooter handleSave={handleSave} />
    </Form>
  );
};

export default LocationForm;
