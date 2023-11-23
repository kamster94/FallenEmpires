import React from 'react';
import { getAllAncestries, getTagsByIds } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import TagPillsList from '@/components/TagPillsList';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

const AncestriesViewTable = async () => {
  const { buildRoute } = useRoute();
  const ancestries = await getAllAncestries();
  const headers = ['Title', 'Tags'];

  const rows: Row[] = await Promise.all(
    ancestries.map(async (ancestry) => {
      const tags = await getTagsByIds(
        ancestry.ancestriesTags.map((ancestryTag) => ancestryTag.tagId)
      );
      return {
        cells: [
          ancestry.title,
          <TagPillsList key={ancestry.id} parentId={ancestry.id} tags={tags} />,
        ],
        actions: (
          <TableActions
            viewRoute={buildRoute({
              category: RoutePath.Rules,
              subcategory: RoutePath.Ancestries,
              slug: ancestry.slug,
            })}
          />
        ),
      };
    })
  );

  return <DataTable headers={headers} rows={rows} />;
};

export default AncestriesViewTable;
