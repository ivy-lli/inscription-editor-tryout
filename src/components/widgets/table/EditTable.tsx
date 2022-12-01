import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

//
import './EditTable.css';

//
import {
  Column,
  Table,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  RowData
} from '@tanstack/react-table';
import { makeData, Person } from './makeData';
import { Doc } from '../../../data/document';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    // addRow: () => void;
  }
}

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

// function useSkipper() {
//   const shouldSkipRef = React.useRef(true);
//   const shouldSkip = shouldSkipRef.current;

//   // Wrap a function with this to skip a pagination reset temporarily
//   const skip = React.useCallback(() => {
//     shouldSkipRef.current = false;
//   }, []);

//   React.useEffect(() => {
//     shouldSkipRef.current = true;
//   });

//   return [shouldSkip, skip] as const;
// }

function EditTable(props: { data: Doc[]; onChange: (change: Doc[]) => void }) {
  const rerender = React.useReducer(() => ({}), {})[1];

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

  const [data, setData] = React.useState(() => props.data /*makeData(2)*/);
  const refreshData = () => setData(() => props.data /*makeData(2)*/);
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

  // const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        // Skip age index reset until after next rerender
        // skipAutoResetPageIndex();
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
      // addRow: () => {
      //   skipAutoResetPageIndex();
      //   setData(old => {
      //     old.push({ firstName: '', lastName: '' });
      //     return old;
      //   });
      // }
    },
    debugTable: true
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
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {/* {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null} */}
                      </div>
                    )}
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
      {/* <div className='flex items-center gap-2'>
        <button className='border rounded p-1' onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
          {'<<'}
        </button>
        <button className='border rounded p-1' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          {'<'}
        </button>
        <button className='border rounded p-1' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          {'>'}
        </button>
        <button
          className='border rounded p-1'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className='flex items-center gap-1'>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <span className='flex items-center gap-1'>
          | Go to page:
          <input
            type='number'
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className='border p-1 rounded w-16'
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div> */}
      {table.options.debugTable && (
        <>
          <div>{table.getRowModel().rows.length} Rows</div>
          <div>
            <button onClick={() => rerender()}>Force Rerender</button>
          </div>
          <div>
            <button onClick={() => refreshData()}>Refresh Data</button>
          </div>
        </>
      )}
    </div>
  );
}

function Filter({ column, table }: { column: Column<any, any>; table: Table<any> }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === 'number' ? (
    <div className='flex space-x-2'>
      <input
        type='number'
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={e => column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])}
        placeholder={`Min`}
        className='w-24 border shadow rounded'
      />
      <input
        type='number'
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={e => column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])}
        placeholder={`Max`}
        className='w-24 border shadow rounded'
      />
    </div>
  ) : (
    <input
      type='text'
      value={(columnFilterValue ?? '') as string}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className='w-36 border shadow rounded'
    />
  );
}

export default EditTable;
