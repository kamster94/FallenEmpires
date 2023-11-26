import React from 'react';
import { getAllFeats, getTagsByIds } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import TagPillsList from '@/components/TagPillsList';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

const FeatsViewTable = async () => {
  const { buildRoute } = useRoute();
  const feats = await getAllFeats();
  const headers = ['Title', 'Tags'];

  const rows: Row[] = await Promise.all(
    feats.map(async (feat) => {
      const tags = await getTagsByIds(
        feat.featsTags.map((featTag) => featTag.tagId)
      );
      return {
        cells: [
          feat.title,
          <TagPillsList key={feat.id} parentId={feat.id} tags={tags} />,
        ],
        actions: (
          <TableActions
            viewRoute={buildRoute({
              category: RoutePath.Rules,
              subcategory: RoutePath.Feats,
              slug: feat.slug,
            })}
          />
        ),
      };
    })
  );

  return <DataTable headers={headers} rows={rows} />;
};

export default FeatsViewTable;
