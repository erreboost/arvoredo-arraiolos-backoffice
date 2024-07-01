import React, {useEffect, useState} from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
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
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {Pencil} from 'lucide-react';

interface Tree {
  _id: string;
  Data: string;
  Localizacao: string;
  Especie: string;
  Nomecomum: string;
}

interface DataTableProps {
  trees: Tree[];
}

const columns: ColumnDef<Tree>[] = [
  {
    accessorKey: '_id',
    header: 'ID',
    // cell: (info) => <span className="text-left">{info.getValue()}</span>,
  },
  {
    accessorKey: 'Especie',
    header: 'Espécie',
    // cell: (info) => <span className="text-left">{info.getValue()}</span>,
  },
  {
    accessorKey: 'Localizacao',
    header: 'Localização',
    // cell: (info) => <span className="text-left">{info.getValue()}</span>,
  },
  {
    accessorKey: 'Data',
    header: 'Data',
    // cell: (info) => {
    //   const date = new Date(info.getValue() as string);
    //   return (
    //     <span className="text-left">{date.toLocaleDateString('pt-PT')}</span>
    //   );
    // },
  },
  {
    accessorKey: 'Nomecomum',
    header: 'Nome Comum',
    // cell: (info) => <span className="text-left">{info.getValue()}</span>,
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Ações',
    cell: ({row}) => {
      const {_id} = row.original;
      if (!_id) {
        return null;
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <Pencil className="w-4 h-4 mr-2" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <div className="flex items-center">
                  <span className="ml-2">Editar</span>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Link href={`/arvores/${_id}`}>
                      <Pencil className="w-4 h-4 mr-2" />
                      <span>Editar</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
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
      <div className="flex items-center mb-2">
        <Input
          placeholder="Filtrar por Espécie..."
          value={(table.getColumn('Especie')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('Especie')?.setFilterValue(event.target.value)
          }
        />
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
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
                  colSpan={columns.length}
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
