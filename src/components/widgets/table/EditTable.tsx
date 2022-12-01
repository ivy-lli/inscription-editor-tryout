import React from 'react';

import './EditTable.css';

import { ColumnDef, useReactTable, getCoreRowModel, flexRender, RowData } from '@tanstack/react-table';
import { Doc } from '../../../data/document';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// ToDo: try build a component
// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<Doc>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return <input className='input' value={value as string} onChange={e => setValue(e.target.value)} onBlur={onBlur} />;
  }
};

function EditTable(props: { data: Doc[]; onChange: (change: Doc[]) => void }) {
  const columns = React.useMemo<ColumnDef<Doc>[]>(
    () => [
      {
        accessorKey: 'description',
        header: () => <span>Description</span>,
        footer: props => props.column.id
      },
      {
        accessorFn: row => row.url,
        id: 'url',
        header: () => <span>URL</span>,
        footer: props => props.column.id
      }
    ],
    []
  );

  const [data, setData] = React.useState(() => props.data);
  const addRow = () =>
    setData(() => {
      const newData = [...data];
      newData.push({ description: '', url: '' });
      props.onChange(newData);
      return newData;
    });

  const removeTableRow = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    props.onChange(newData);
    setData(newData);
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        const newData = data.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...data[rowIndex]!,
              [columnId]: value
            };
          }
          return row;
        });
        setData(newData);
        props.onChange(newData);
      }
    }
    // debugTable: true
  });

  return (
    <div className='table'>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>}
                  </th>
                );
              })}
              <th key={`${headerGroup.id}-actions`} colSpan={2}>
                Actions
              </th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                })}
                <td key={`${row.id}-actions`}>
                  <span className='action-buttons'>
                    <button onClick={() => removeTableRow(row.index)}>🗑️</button>
                    <button>🔍</button>
                    <button>➡️</button>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3} className='add-row'>
              <button onClick={addRow}>
                <span className='add-row-plus'>+</span>
              </button>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default EditTable;
