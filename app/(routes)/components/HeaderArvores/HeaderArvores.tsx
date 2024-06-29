'use client';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {CirclePlus} from 'lucide-react';
import {useState} from 'react';
import {FormCreateArvore} from '../FormCreateArvore';

export function HeaderArvores() {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  return (
    <div className=" flex justify-between items-center">
      <h2 className="text-2xl">Lista de Árvores</h2>

      <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button>Adicionar Árvore</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogHeader>
            <DialogTitle>Adicionar</DialogTitle>
            <DialogDescription>Criar árvore</DialogDescription>
          </DialogHeader>

          <FormCreateArvore />
        </DialogContent>
      </Dialog>
    </div>
  );
}
