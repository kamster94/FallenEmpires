import React from 'react';
import Button from '@/components/Button';
import { faSave } from '@fortawesome/free-solid-svg-icons';

interface Props {
  handleSave?: () => void;
}

const FormFooter = ({ handleSave }: Props) => {
  return (
    <div className='flex justify-end'>
      {handleSave && <Button label='Save' icon={faSave} onClick={handleSave} />}
    </div>
  );
};

export default FormFooter;
