import React from 'react';
import { getAllHeritages, getTagsByIds } from '@/app/actions';
import DataTable, { Row } from '@/components/Tables/DataTable';
import TableActions from '@/components/Tables/TableActions';
import TagPillsList from '@/components/TagPillsList';
import useRoute from '@/hooks/useRoute';
import { RoutePath } from '@/enums';

const HeritagesViewTable = async () => {
  const { buildRoute } = useRoute();
  const heritages = await getAllHeritages();
  const headers = ['Title', 'Tags'];

  const rows: Row[] = await Promise.all(
    heritages.map(async (heritage) => {
      const tags = await getTagsByIds(
        heritage.heritagesTags.map((heritageTag) => heritageTag.tagId)
      );
      return {
        cells: [
          heritage.title,
          <TagPillsList key={heritage.id} parentId={heritage.id} tags={tags} />,
        ],
        actions: (
          <TableActions
            viewRoute={buildRoute({
              category: RoutePath.Rules,
              subcategory: RoutePath.Heritages,
              slug: heritage.slug,
            })}
          />
        ),
      };
    })
  );

  return <DataTable headers={headers} rows={rows} />;
};

export default HeritagesViewTable;
