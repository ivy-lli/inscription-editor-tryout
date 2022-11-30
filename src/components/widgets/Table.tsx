import {
  CellContext,
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  RowData,
  TableMeta,
  useReactTable
} from '@tanstack/react-table';
import { info } from 'console';
import { useEffect, useReducer, useState } from 'react';
import { EMPTY_NAME_DOC, NameDoc } from '../../data/document';
import './Table.css';

// declare module '@tanstack/react-table' {
//   interface TableMeta<TData extends RowData> {
//     updateData: (rowIndex: number, columnId: string, value: unknown) => void;
//   }
// }

const EditableCell = (props: { info: CellContext<NameDoc, string>; updateData: (index: number, id: string, value: string) => void }) => {
  const initValue = props.info.getValue();
  const [value, setValue] = useState(initValue);

  const onBlur = () => {
    props.updateData(props.info.row.index, props.info.column.id, value);
  };

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  return <input className='input' value={value as string} onChange={e => setValue(e.target.value)} onBlur={onBlur} />;
};

const Table = (props: { data: NameDoc[]; onChange: (change: NameDoc[]) => void }) => {
  const [data, setData] = useState(() => props.data);

  const columnHelper = createColumnHelper<NameDoc>();

  const updateData = (index: number, id: string, value: string) => {
    const change = { ...data[index], [id]: value };
    data[index] = change;
    // props.onChange(data);
    setData(data);
  };

  const addTableRow = () => {
    data.push(EMPTY_NAME_DOC);
    // props.onChange(data);
    setData(props.data);
  };

  const removeTableRow = (index: number) => {
    data.splice(index, 1);
    // props.onChange(data);
    setData(data);
  };

  const columns = [
    columnHelper.accessor('description', {
      // cell: info => info.getValue(),
      cell: info => <EditableCell info={info} updateData={updateData} />,
      header: () => <span>Description</span>
    }),
    columnHelper.accessor(row => row.url, {
      id: 'url',
      // cell: info => info.getValue(),
      cell: info => <EditableCell info={info} updateData={updateData} />,
      header: () => <span>URL</span>
    }),
    columnHelper.accessor('action', {
      id: 'action',
      cell: info => (
        <span className='action-buttons'>
          <button onClick={() => removeTableRow(info.row.index)}>🗑️</button>
          <button>🔍</button>
          <button>➡️</button>
        </span>
      ),
      header: () => <span>Action</span>
    })
  ];

  const defaultColumn: Partial<ColumnDef<NameDoc>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue();
      // We need to keep and update the state of the cell normally
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(initialValue);

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        const change = { ...props.data[index], [id]: value };
        props.data[index] = change;
        props.onChange(props.data);
        // table.options.meta?.updateData(index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      return <input className='input' value={value as string} onChange={e => setValue(e.target.value)} onBlur={onBlur} />;
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
              <button onClick={addTableRow}>
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
