'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Select, { OnChangeValue } from 'react-select';
import { getAllTags } from '@/app/actions';
import classnames from 'classnames';

export interface TagOption {
  value: number;
  label: string;
}

interface Props {
  values: number[];
  onChange: (tagIds: number[]) => void;
}

const TagInput = ({ values, ...props }: Props) => {
  const [tags, setTags] = useState<TagOption[]>([]);
  const selectedTags = useMemo(() => {
    function getTagOptionFromId(id: number): TagOption {
      return tags.find((tag) => tag.value === id) ?? { value: 0, label: '' };
    }

    if (!tags.length) {
      return [];
    }

    return values.map((value) => getTagOptionFromId(value));
  }, [tags, values]);

  useEffect(() => {
    getAllTags().then((tags) => {
      setTags(tags.map((tag) => ({ value: tag.id, label: tag.label })));
    });
  }, []);

  const handleChange = (newValue: OnChangeValue<TagOption, true>) => {
    props.onChange(newValue.map((value) => value.value));
  };

  return (
    <Select
      isMulti
      options={tags}
      value={selectedTags}
      onChange={handleChange}
      unstyled
      className='z-50'
      classNames={{
        control: (state) =>
          classnames(
            state.isFocused ? 'border-opacity-50' : 'border-opacity-100',
            'border-2 p-2 bg-secondary border-primary'
          ),
        dropdownIndicator: () => 'text-gray-600 hover:text-black',
        clearIndicator: () => 'text-gray-600 hover:text-black',
        multiValue: () =>
          'bg-primary text-secondary px-2 hover:text-white space-x-2 mr-2',
        menu: () => 'bg-white p-1 shadow-lg ring-1 ring-black/5',
        option: () => 'p-2 hover:bg-primary hover:text-white',
        noOptionsMessage: () => 'p-2',
      }}
    />
  );
};

export default TagInput;
