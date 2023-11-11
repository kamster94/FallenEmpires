'use client';

import React from 'react';
import ButtonLink from '@/components/ButtonLink';
import { faMagnifyingGlass, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/Button';

interface Props {
  viewRoute?: string;
  editRoute?: string;
  deleteAction?: () => Promise<void>;
}

const TableActions = ({ viewRoute, editRoute, deleteAction }: Props) => {
  async function handleDelete() {
    if (deleteAction) {
      await deleteAction();
    }
  }

  return (
    <div className="flex space-x-2">
      {viewRoute && (
        <ButtonLink label='' route={viewRoute} icon={faMagnifyingGlass} />
      )}
      {editRoute && (
        <ButtonLink label='' route={editRoute} icon={faPencil} />
      )}
      {deleteAction && (
        <Button label='' onClick={handleDelete} icon={faTrash} />
      )}
    </div>
  );
};

export default TableActions;
