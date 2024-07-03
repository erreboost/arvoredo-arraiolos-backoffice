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
import {FormCreateCustomerProps} from '../FormCreateArvore/FormCreateArvore.types';
import Link from 'next/link';

export function HeaderArvores() {
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const formCreateArvoreProps: FormCreateCustomerProps = {
    setOpenModalCreate,
  };

  return (
    <div className="flex justify-center items-center gap-x-6">
      <h2 className="text-2xl">Lista das Árvores</h2>

      <Link href="/nova-arvore">
        <Button>Adicionar Árvore</Button>
      </Link>

      {/* <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
          <Button>Adicionar Árvore</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Adicionar</DialogTitle>
            <DialogDescription>Criar árvore</DialogDescription>
          </DialogHeader>

          <FormCreateArvore {...formCreateArvoreProps} />
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
