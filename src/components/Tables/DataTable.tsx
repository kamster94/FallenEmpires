'use client';

import React, { ReactNode } from 'react';

export interface Row {
  cells: string[];
  actions: ReactNode;
}

interface Props {
  headers: string[];
  rows: Row[];
}

const DataTable = ({ headers, rows }: Props) => {
  return (
    <table className="border-collapse w-full bg-secondary table-auto">
      <thead className="text-left bg-primary text-secondary">
        <tr className="border-x-2 border-primary">
          {headers.map((header, index) => <th key={index} className="px-4 py-3">{header}</th>)}
          <th className="px-4 py-3"></th>
        </tr>
      </thead>
      <tbody className="border-b-2 border-primary">
        {rows.map((row, rowIndex) => {
          return (
            <tr
              key={rowIndex}
              className="border-t-[1px] border-x-2 border-primary hover:bg-white"
            >
              {row.cells.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3">{cell}</td>)}
              <td className="px-4 py-3">
                {row.actions}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
