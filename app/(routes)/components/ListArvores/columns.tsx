"use client";
import React, { useState } from "react";
import {
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Image as ImageIcon,
  Trash,
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tree } from "./tree";
import { useAuths } from "@/app/context/AuthContext";

const PhotoDialog = ({ photos }: { photos: string[] }) => {
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
              <ImageIcon className="mr-1 h-4 w-4" />
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

const ActionsCell = ({ row }: any) => {
  const { _id } = row.original;
  const { userType, setShowDeleteModal, setTreeToDeleteId } = useAuths();

  const openModalAndDelete = () => {
    setShowDeleteModal(true);
    setTreeToDeleteId(_id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-4 w-8 p-0">
          <span className="sr-only">Abrir Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <Link href={`/arvores/${_id}`}>
          <DropdownMenuItem>
            <Pencil className="mr-2 flex h-4 w-4 items-center justify-center" />
            Editar
          </DropdownMenuItem>
        </Link>
        {userType?.userGroup === "administrator" && (
          <DropdownMenuItem>
            <button onClick={() => openModalAndDelete()} className="flex">
              <Trash className="mr-2 flex h-4 w-4 items-center justify-center" />
              Deletar
            </button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Tree>[] = [
  {
    id: "actions",
    header: "Ações",
    cell: ActionsCell,
  },
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => <span>{row.original._id}</span>,
  },
  {
    accessorKey: "GlobalID",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Global ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "Codigo",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "Fotos",
    header: () => <div className="flex justify-center">Fotos</div>,
    cell: ({ row }) => {
      const photos = row.getValue("Fotos") as string[];
      return <PhotoDialog photos={photos} />;
    },
  },
  {
    accessorKey: "Nomecomum",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome Comum
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "Especie",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Espécie
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "Data",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return <span>{date.toLocaleDateString("pt-PT")}</span>;
    },
  },
  {
    accessorKey: "Dicofre",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dicofre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "Localizacao",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Localização
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "Estado_fit",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado Fitossanitário
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "Esdado_cal",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado de Conservação
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "Ava_Risco",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Avaliação de Risco
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "Propo_Inte",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Proposta de Intervenção
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
