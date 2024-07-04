'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {ArvoreFormTypes} from './ArvoreForm.types';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {formSchema} from './ArvoreForm.form';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import DragAndDrop from '../DragAndDrop/page';

export function ArvoreForm({arvore}: ArvoreFormTypes) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...arvore,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
    setIsModalOpen(true);
  };

  const handleImageReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Logic to replace the image

      setIsModalOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  useEffect(() => {
    const now = new Date();
    setCurrentDate(
      now.toLocaleString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    );
  }, []);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="_id"
              render={({field}) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduza..."
                      type="text"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Data"
              render={({field}) => (
                <FormItem>
                  <div className="mt-10 ml-4">
                    <FormLabel>Data: </FormLabel>
                    <FormControl>
                      <span>{currentDate}</span>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Dicofre"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Dicofre</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Localizacao"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Especie"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Espécie</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Nomecomum"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Nome Comum</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Estado_fit"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Estado Fitossanitário</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Esdado_cal"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Estado da Caldeira</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Ava_Risco"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Avaliação de Risco</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Propo_Inte"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Proposta de Intervenção</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            <FormField
              control={form.control}
              name="Obser"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Observação</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Introduza..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="GlobalID"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Global ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="raz_calssifica"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Razão de Classificação</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agen_bioticos"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Agentes Bióticos</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Orgaos_afetados"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Órgãos Afetados</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Grau_de_desfolha"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Grau de Desfolha</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Sintomas_sinais_desfolhadores"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Sintomas/Sinais de Desfolhadores</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Grau_de_descoloracao_da_copa"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Grau de Descoloração da Copa</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Deformacao_dos_tecidos"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Deformação dos Tecidos</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Alteracao_da_estrutura"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Alteração da Estrutura</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Supressao_parcial_dos_orgaos"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Supressão Parcial dos Órgãos</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Orificios_perfuracoes"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Orifícios/Perfurações</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="galerias"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Galerias</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="necroses"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Necroses</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serrim"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Serrim</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="exsudacao"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Exsudação</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="novelos_fibra"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Novelos de Fibra</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Forma_caldeira"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Forma da Caldeira</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Altura_v2"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Altura v2</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduza..."
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capv2"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Cap v2</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="DAP_v2"
              render={({field}) => (
                <FormItem>
                  <FormLabel>DAP v2</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduza..."
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="idade_apro_v2"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Idade Aproximada v2</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Especie_Val"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Espécie Val</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduza..."
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Outro_Nome_Comum"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Outro Nome Comum</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Outra_Especie"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Outra Espécie</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Codigo"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Gerado Automaticamente"
                      type="text"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Outra_Tip_Int"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Outra Tip. Int.</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="grupos"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Grupos</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="POINT_X"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Coordenada X</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="POINT_Y"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Coordenada Y</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="POINT_Z"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Coordenada Z</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Fotos"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Fotos</FormLabel>
                  <FormControl>
                    {/* <Input
                      placeholder="Introduza URLs separadas por vírgula"
                      type="text"
                      {...field}
                    /> */}
                    <DragAndDrop />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="createdAt"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Data de Criação: </FormLabel>
                  <FormControl>
                    <span>
                      {field.value
                        ? formatDate(field.value)
                        : 'Data não disponível'}
                    </span>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="updatedAt"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Data de Atualização: </FormLabel>
                  <FormControl>
                    <span>
                      {field.value
                        ? formatDate(field.value)
                        : 'Data não disponível'}
                    </span>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Salvar</Button>
        </form>
      </Form>
    </div>
  );
}
