import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, RowData, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import './Table.css';

type Document = {
  description: string;
  url: string;
  action: string;
};

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const defaultData: Document[] = [
  {
    description: 'Placeholder 1',
    url: 'axonivy.com',
    action: ''
  },
  {
    description: 'Placeholder 2',
    url: 'ivyteam.ch',
    action: ''
  }
];

const columnHelper = createColumnHelper<Document>();

const columns = [
  columnHelper.accessor('description', {
    // cell: info => info.getValue(),
    header: () => <span>Description</span>
  }),
  columnHelper.accessor(row => row.url, {
    id: 'url',
    cell: info => info.getValue(),
    header: () => <span>URL</span>
  }),
  columnHelper.accessor('action', {
    id: 'action',
    cell: info => (
      <span className='action-buttons'>
        <button>🗑️</button>
        <button>🔍</button>
        <button>➡️</button>
      </span>
    ),
    header: () => <span>Action</span>
  })
];

const Table = () => {
  const [data, setData] = useState(() => [...defaultData]);

  const defaultColumn: Partial<ColumnDef<Document>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue();
      // We need to keep and update the state of the cell normally
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(initialValue);

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateData(index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      return <input value={value as string} onChange={e => setValue(e.target.value)} onBlur={onBlur} />;
    }
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className='table'>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3} className='add-row'>
              <button>
                <span className='add-row-plus'>+</span>
              </button>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
