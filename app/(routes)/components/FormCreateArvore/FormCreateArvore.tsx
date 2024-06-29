'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
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
import {FormCreateCustomerProps} from './FormCreateArvore.types';
import {useState} from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {UploadButton} from '@uploadthing/react';
import {log} from 'console';
import {toast} from '@/components/ui/use-toast';

const formSchema = z.object({
  nome: z.string(),
  especie: z.string().min(2),
  estado_fit: z.string().min(2),
  foto: z.string(),
});

export function FormCreateArvore(props: FormCreateCustomerProps) {
  const {setOpenModalCreate} = props;
  const [photoUpload, setPhotoUpload] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      especie: '',
      estado_fit: '',
      foto: '',
    },
  });

  const {isValid} = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="nome"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="especie"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Espécie</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a espécie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="especie1">Espécie 1</SelectItem>
                      <SelectItem value="especie2">Espécie 2</SelectItem>
                      <SelectItem value="especie3">Espécie 3</SelectItem>
                      <SelectItem value="especie4">Espécie 4</SelectItem>
                      <SelectItem value="especie5">Espécie 5</SelectItem>
                      <SelectItem value="especie6">Espécie 6</SelectItem>
                      <SelectItem value="especie7">Espécie 7</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estado_fit"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="foto"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Foto</FormLabel>
                  <FormControl>
                    {photoUpload ? (
                      <p>Foto submetida</p>
                    ) : (
                      <UploadButton
                        className="bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3"
                        {...field}
                        endpoint="profileImage"
                        onClientUploadComplete={(res) => {
                          form.setValue('profileImage', res?.[0].url);
                          setPhotoUpload(true);
                          toast({
                            title: 'Imagem submetida com sucesso',
                            description: 'Imagem carregada com sucesso',
                          });
                        }}
                        onUploadError={(error: Error) => {
                          toast({
                            title: 'Erro ao submeter imagem',
                            description: error.message,
                          });
                          console.log(error);
                        }}
                      />
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={!isValid}>
            Submeter
          </Button>
        </form>
      </Form>
    </div>
  );
}
