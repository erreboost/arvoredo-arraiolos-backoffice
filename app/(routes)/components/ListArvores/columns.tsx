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
                setSelectedPhoto(`${process.env.BASE_URL}/${photo}`)
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
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({row}) => <span>{row.original._id}</span>,
  },
  {
    accessorKey: 'Codigo',
    header: () => <div className="flex justify-center">Código</div>,
  },
  {
    accessorKey: 'Fotos',
    header: () => <div className="flex justify-center">Fotos</div>,
    cell: ({row}) => {
      const photos = row.getValue('Fotos') as string[];
      return <PhotoDialog photos={photos} />;
    },
  },
  {
    accessorKey: 'Nomecomum',
    header: () => <div className="flex justify-center">Nome Comum</div>,
  },
  {
    accessorKey: 'Especie',
    header: () => <div className="flex justify-center">Espécie</div>,
  },

  {
    accessorKey: 'Data',
    header: () => <div className="flex justify-center">Data</div>,
    cell: ({getValue}) => {
      const date = new Date(getValue() as string);
      return <span>{date.toLocaleDateString('pt-PT')}</span>;
    },
  },
  {
    accessorKey: 'Dicofre',
    header: () => <div className="flex justify-center">Dicofre</div>,
  },
  {
    accessorKey: 'Localizacao',
    header: () => <div className="flex justify-center">Localização</div>,
  },

  {
    accessorKey: 'Estado_fit',
    header: () => (
      <div className="flex justify-center">Estado Fitossanitário</div>
    ),
  },

  {
    accessorKey: 'Esdado_cal',
    header: () => (
      <div className="flex justify-center">Estado de Conservação</div>
    ),
  },
  {
    accessorKey: 'Ava_Risco',
    header: () => <div className="flex justify-center">Avaliação de Risco</div>,
  },

  {
    accessorKey: 'Propo_Inte',
    header: () => (
      <div className="flex justify-center">Proposta de Intervenção</div>
    ),
  },
  {
    accessorKey: 'Obser',
    header: () => <div className="flex justify-center">Observações</div>,
  },

  {
    accessorKey: 'GlobalID',
    header: () => <div className="flex justify-center">Global ID</div>,
  },
  {
    accessorKey: 'raz_calssifica',
    header: () => (
      <div className="flex justify-center">Razão de Classificação</div>
    ),
  },
  {
    accessorKey: 'agen_bioticos',
    header: () => <div className="flex justify-center">Agentes Bióticos</div>,
  },
  {
    accessorKey: 'Orgaos_afetados',
    header: () => <div className="flex justify-center">Órgãos Afetados</div>,
  },
  {
    accessorKey: 'Grau_de_desfolha',
    header: () => <div className="flex justify-center">Grau de Desfolha</div>,
  },
  {
    accessorKey: 'Sintomas_sinais_desfolhadores',
    header: () => <div className="flex justify-center">Sintomas e sinais</div>,
  },
  {
    accessorKey: 'Grau_de_descoloracao_da_copa',
    header: () => (
      <div className="flex justify-center">Grau de Descoloração</div>
    ),
  },
  {
    accessorKey: 'Deformacao_dos_tecidos',
    header: () => (
      <div className="flex justify-center">Deformação dos tecidos</div>
    ),
  },
  {
    accessorKey: 'Alteracao_da_estrutura',
    header: () => (
      <div className="flex justify-center">Alteração da estrutura</div>
    ),
  },
  {
    accessorKey: 'Supressao_parcial_dos_orgaos',
    header: () => (
      <div className="flex justify-center">Supressão parcial dos orgãos</div>
    ),
  },
  {
    accessorKey: 'Orificios_perfuracoes',
    header: () => (
      <div className="flex justify-center">Orifícios e perfurações</div>
    ),
  },
  {
    accessorKey: 'galerias',
    header: () => <div className="flex justify-center">Galerias</div>,
  },
  {
    accessorKey: 'necroses',
    header: () => <div className="flex justify-center">Necroses</div>,
  },
  {
    accessorKey: 'serrim',
    header: () => <div className="flex justify-center">Serrim</div>,
  },
  {
    accessorKey: 'exsudacao',
    header: () => <div className="flex justify-center">Exsudação</div>,
  },
  {
    accessorKey: 'novelos_fibra',
    header: () => <div className="flex justify-center">Novelos e Fibra</div>,
  },
  {
    accessorKey: 'Forma_caldeira',
    header: () => <div className="flex justify-center">Forma da Caldeira</div>,
  },
  {
    accessorKey: 'Altura_v2',
    header: () => <div className="flex justify-center">Altura</div>,
  },
  {
    accessorKey: 'capv2',
    header: () => <div className="flex justify-center">Cap</div>,
  },
  {
    accessorKey: 'DAP_v2',
    header: () => <div className="flex justify-center">DAP</div>,
  },
  {
    accessorKey: 'idade_apro_v2',
    header: () => <div className="flex justify-center">Idade Aproximada</div>,
  },
  {
    accessorKey: 'Especie_Val',
    header: () => <div className="flex justify-center">Especie</div>,
  },
  {
    accessorKey: 'Outro_Nome_Comum',
    header: () => <div className="flex justify-center">Outro Nome Comum</div>,
  },
  {
    accessorKey: 'Outra_Especie',
    header: () => <div className="flex justify-center">Outra Especie</div>,
  },

  {
    accessorKey: 'Outra_Tip_Int',
    header: () => <div className="flex justify-center">Outra Tip Int</div>,
  },
  {
    accessorKey: 'grupos',
    header: () => <div className="flex justify-center">Grupos</div>,
  },
  {
    accessorKey: 'POINT_X',
    header: () => <div className="flex justify-center">X</div>,
  },
  {
    accessorKey: 'POINT_Y',
    header: () => <div className="flex justify-center">Y</div>,
  },
  {
    accessorKey: 'POINT_Z',
    header: () => <div className="flex justify-center">Z</div>,
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className="flex justify-center">Data Criação</div>,
    cell: ({getValue}) => {
      const date = new Date(getValue() as string);
      return <span>{date.toLocaleDateString('pt-PT')}</span>;
    },
  },
  {
    accessorKey: 'updatedAt',
    header: () => <div className="flex justify-center">Última atualiação</div>,
    cell: ({getValue}) => {
      const date = new Date(getValue() as string);
      return <span>{date.toLocaleDateString('pt-PT')}</span>;
    },
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
