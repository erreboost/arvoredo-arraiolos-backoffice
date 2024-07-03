'use client';

import React, {useState} from 'react';
import {
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Image as ImageIcon,
} from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {Tree} from './tree';

const PhotoDialog = ({photos}: {photos: string[]}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-2">
      {photos.map((photo, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setSelectedPhoto(`https://app.grupoerre.pt:5258/${photo}`)
              }
            >
              <ImageIcon className="h-4 w-4 mr-1" />
              Foto {index + 1}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Foto {index + 1}</DialogTitle>
            </DialogHeader>
            {selectedPhoto && (
              <Image
                src={selectedPhoto}
                alt="Tree Photo"
                width={600}
                height={400}
                className="mx-auto"
              />
            )}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export const columns: ColumnDef<Tree>[] = [
  {
    accessorKey: '_id',
    header: ({column}) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({row}) => <span>{row.original._id}</span>,
  },
  {
    accessorKey: 'Data',
    header: 'Data',
    cell: ({getValue}) => {
      const date = new Date(getValue() as string);
      return <span>{date.toLocaleDateString('pt-PT')}</span>;
    },
  },
  {
    accessorKey: 'Localizacao',
    header: 'Localização',
  },
  {
    accessorKey: 'Especie',
    header: 'Espécie',
  },
  {
    accessorKey: 'Nomecomum',
    header: 'Nome Comum',
  },
  {
    accessorKey: 'Estado_fit',
    header: 'Estado Fitossanitário',
  },
  {
    accessorKey: 'Fotos',
    header: 'Fotos',
    cell: ({row}) => {
      const photos = row.getValue('Fotos') as string[];
      return <PhotoDialog photos={photos} />;
    },
  },
  {
    accessorKey: 'Dicofre',
    header: 'Dicofre',
  },
  {
    accessorKey: 'Estado_fit',
    header: 'Estado',
  },
  {
    accessorKey: 'Esdado_cal',
    header: 'Estado Cal',
  },
  {
    accessorKey: 'Ava_Risco',
    header: 'Avaliação de Risco',
  },
  {
    accessorKey: 'agen_bioticos',
    header: 'Agentes Bióticos',
  },
  {
    accessorKey: 'Orgaos_afetados',
    header: 'Órgãos Afetados',
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({row}) => {
      const {_id} = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-4 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/arvores/${_id}`}>
              <DropdownMenuItem>
                <Pencil className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
