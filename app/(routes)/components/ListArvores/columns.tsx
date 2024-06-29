'use client';

import {ArrowUpDown, MoreHorizontal, Pencil} from 'lucide-react';
import {ColumnDef} from '@tanstack/react-table';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import Image from 'next/image';

interface Arvores {
  id: string;
  name: string;
  especie: string;
  profileImage?: string;
}

export const columns: ColumnDef<Arvores>[] = [
  {
    accessorKey: 'id',
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({row}) => {
      const image = row.getValue('profileImage');
      return (
        <div>
          <Image
            src={typeof image === 'string' ? image : '/images/tree.png'}
            width={40}
            height={40}
            alt="Imagem"
            className="h-auto w-auto"
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'especie',
    header: 'Espécie',
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({row}) => {
      const {id} = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-4 p-8">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={`/arvores/${id}`}>
                <Pencil className="w-4 h-4 mr-2" />
                <span>Editar</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
