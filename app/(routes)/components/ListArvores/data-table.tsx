import React, {useEffect, useState} from 'react';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

interface Tree {
  _id: string;
  Data: string;
  Localizacao: string;
  Especie: string;
}

interface DataTableProps {
  trees: Tree[];
}

const columns: ColumnDef<Tree>[] = [
  {
    accessorKey: 'Especie',
    header: 'Espécie',
  },
  {
    accessorKey: 'Localizacao',
    header: 'Localização',
  },
  // Add more columns as needed
];

const DataTable = ({trees}: DataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const table = useReactTable({
    data: trees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  if (!isMounted) {
    return null;
  }

  return (
    <div className="p-4 bg-background shadow-md rounded-lg mt-4">
      <div className="flex items-center">
        <Input
          placeholder="Filtrar Árvores..."
          value={table.getColumn('Especie')?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn('Especie')?.setFilterValue(event.target.value)
          }
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length} // Use the columns array length directly
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
