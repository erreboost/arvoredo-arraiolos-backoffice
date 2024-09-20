"use client";
import proj4 from "proj4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ArvoreFormTypes } from "./ArvoreForm.types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formSchema } from "./ArvoreForm.form";
import { useRouter } from "next/navigation";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import DragAndDrop from "../DragAndDrop/page";
import MapId from "./Map";
import { useAuths } from "@/app/context/AuthContext";
import { createTree, updateTree } from "@/app/api/editors";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  OPTIONS_AGEN_BIOTICOS,
  OPTIONS_ALTERACAO_DA_ESTRUTURA,
  OPTIONS_AVA_RISCO,
  OPTIONS_DEFORMACAO_DOS_TECIDOS,
  OPTIONS_ESTADO_CAL,
  OPTIONS_ESTADO_FIT,
  OPTIONS_EXUDACAO,
  OPTIONS_FORMA_CALDEIRA,
  OPTIONS_GALERIA,
  OPTIONS_GRAU_DESCOLORACAO_COPA,
  OPTIONS_GRAU_DESFOLHA,
  OPTIONS_IDADE_APROV_V2,
  OPTIONS_LOCALIZACAO,
  OPTIONS_NECROSES,
  OPTIONS_NOVELOS_FIBRA,
  OPTIONS_ORGAOS_AFETADOS,
  OPTIONS_ORIFICIOS_PERFURACOES,
  OPTIONS_RAZ_CLASSIFICA,
  OPTIONS_SERRIM,
  OPTIONS_SINTOMAS_SINAIS_DESFOLHADORES,
  OPTIONS_SUPRESSAO_PARCIAL_ORGAOS,
} from "./optionsForm";

export function ArvoreForm({ arvore, type }: ArvoreFormTypes) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  const { setLatLong, latLong, setCoordinates, coordinates } = useAuths();

  const wgs84 = "EPSG:4326";
  const etrs89_tm06 = "EPSG:3763";
  proj4.defs("EPSG:3763", "+proj=utm +zone=29 +datum=ETRS89 +units=m +no_defs");
  // const latitude = 38.71667
  // const longitude = -9.13333

  const [x, y] = proj4(wgs84, etrs89_tm06, [
    Number(latLong.longitude),
    Number(latLong.latitude),
  ]);

  useEffect(() => {
    if (latLong.latitude && latLong.longitude) {
      const [x, y] = proj4(wgs84, etrs89_tm06, [
        Number(latLong.longitude),
        Number(latLong.latitude),
      ]);

      setCoordinates({ x, y });
    }
  }, [latLong, setCoordinates]);

  // console.log(`ETRS89 / Portugal TM06 Coordinates: X = ${x}, Y = ${y}`)
  // console.log(`ETRS89 / Portugal TM06 Coordinates: X = ${x}, Y = ${y}`);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    //@ts-ignore
    defaultValues: {
      ...arvore,
    },
  });

  useEffect(() => {
    if (type === "create") {
      // //console.log('MAP X Y', latLong)
      form.setValue("POINT_X_G", String(latLong.latitude));
      form.setValue("POINT_Y_G", String(latLong.longitude));
    }
  }, [latLong]);

  const onSubmitCreate = async (values: z.infer<typeof formSchema>) => {
    console.log("Create", coordinates.x, coordinates.y);
    createTree(values, coordinates.x, coordinates.y);
  };

  const onSubmitEdit = async (values: z.infer<typeof formSchema>) => {
    updateTree(values, String(values._id));
    // //console.log('Edit', values);
  };

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
    setIsModalOpen(true);
  };

  const handleImageReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsModalOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  useEffect(() => {
    const now = new Date();
    setCurrentDate(
      now.toLocaleString("pt-PT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    );
  }, []);

  const [dapField, setDapField] = useState(form.watch("DAP_v2"));

  let watchDap = form.watch("DAP_v2");

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={
            type === "create"
              ? form.handleSubmit(onSubmitCreate)
              : form.handleSubmit(onSubmitEdit)
          }
          className="space-y-8"
        >
          <div>
            {type === "create" ? (
              <div className="w-full">
                {/* <ESRIMAP
                  apiKey={
                    'AAPK64cf373759a54865a9b553b5c82a36e12DR_FtikWVtRu-ClaIFkgrexK8Wc8HYxf2E5N-2slqZGEERxgga6uAqiUUTtR1bt=AAPK64cf373759a54865a9b553b5c82a36e12DR_FtikWVtRu-ClaIFkgrexK8Wc8HYxf2E5N-2slqZGEERxgga6uAqiUUTtR1bt'
                  }
                /> */}
                <MapId setLatLong={setLatLong} />
                <div className="flex w-[40%] gap-[20px]">
                  <span className="font-semibold">
                    Latitude:{" "}
                    <span className="font-normal">{latLong.latitude}</span>
                  </span>
                  <span className="font-semibold">
                    Longitude:{" "}
                    <span className="font-normal">{latLong.longitude}</span>
                  </span>
                </div>
              </div>
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* <FormField
              control={form.control}
              name="Codigo"
              render={({ field }) => (
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
            /> */}
            {/* <FormField
              control={form.control}
              name="_id"
              render={({ field }) => (
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
            /> */}

            <FormField
              control={form.control}
              name="Data"
              render={({ field }) => (
                <FormItem>
                  <div className="ml-4 mt-10">
                    <FormLabel>Data: </FormLabel>
                    <FormControl>
                      <span>{currentDate}</span>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            {/* 
            <FormField
              control={form.control}
              name="Dicofre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dicofre</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="Localizacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a localização" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_LOCALIZACAO.map(
                        (
                          item:
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | Promise<AwaitedReactNode>
                            | null
                            | undefined,
                          index: any,
                        ) => (
                          <SelectItem
                            key={`${item}-${index}`}
                            value={String(item)}
                          >
                            {item}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
                // <FormItem>
                //   <FormLabel>Localização</FormLabel>
                //   <FormControl>
                //     <Input placeholder="Introduza..." type="text" {...field} />
                //   </FormControl>
                //   <FormMessage />
                // </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Especie"
              render={({ field }) => (
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
              render={({ field }) => (
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado Fitossanitário</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estado fitossanitário" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_ESTADO_FIT.map(
                        (
                          item:
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | Promise<AwaitedReactNode>
                            | null
                            | undefined,
                          index: any,
                        ) => (
                          <SelectItem
                            key={`${item}-${index}`}
                            value={String(item)}
                          >
                            {item}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Esdado_cal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado da Caldeira</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estado da caldeira" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_ESTADO_CAL.map(
                        (
                          item:
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | Promise<AwaitedReactNode>
                            | null
                            | undefined,
                          index: any,
                        ) => (
                          <SelectItem
                            key={`${item}-${index}`}
                            value={String(item)}
                          >
                            {item}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Ava_Risco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avaliação de Risco</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o avaliação de risco" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_AVA_RISCO.map((item: string, index: number) => (
                        <SelectItem key={`${item}-${index}`} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Propo_Inte"
              render={({ field }) => (
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observação</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Introduza..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="GlobalID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Global ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="raz_calssifica"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Razão de Classificação</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a razão de classificação" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_RAZ_CLASSIFICA.map(
                        (item: string, index: number) => (
                          <SelectItem key={`${item}-${index}`} value={item}>
                            {item}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agen_bioticos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agentes Bióticos</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a agentes bióticos" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_AGEN_BIOTICOS.map(
                        (item: string, index: number) => (
                          <SelectItem key={`${item}-${index}`} value={item}>
                            {item}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Orgaos_afetados"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Órgãos Afetados</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione os órgãos afetados" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_ORGAOS_AFETADOS.map(
                        (item: string, index: number) => (
                          <SelectItem key={`${item}-${index}`} value={item}>
                            {item}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Grau_de_desfolha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grau de Desfolha</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione os grau de desfolha" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_GRAU_DESFOLHA.map(
                        (item: string, index: number) => (
                          <SelectItem key={`${item}-${index}`} value={item}>
                            {item}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Sintomas_sinais_desfolhadores"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sintomas/Sinais de Desfolhadores</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione os sintomas/sinais de desfolhadores" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_SINTOMAS_SINAIS_DESFOLHADORES.map(
                        (item: string, index: number) => (
                          <SelectItem key={`${item}-${index}`} value={item}>
                            {item}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Grau_de_descoloracao_da_copa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grau de Descoloração da Copa</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o grau de descoloração da copa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_GRAU_DESCOLORACAO_COPA.map(
                        (item: string, index: number) => (
                          <SelectItem key={`${item}-${index}`} value={item}>
                            {item}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Deformacao_dos_tecidos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deformação dos Tecidos</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o grau de deformação dos tecidos" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_DEFORMACAO_DOS_TECIDOS.map(
                        (item: string, index: number) => (
                          <SelectItem key={`${item}-${index}`} value={item}>
                            {item}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Alteracao_da_estrutura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alteração da Estrutura</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o grau de alteração da estrutura" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_ALTERACAO_DA_ESTRUTURA.map(
                        (item: string, index: number) => (
                          <SelectItem key={`${item}-${index}`} value={item}>
                            {item}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Supressao_parcial_dos_orgaos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supressão Parcial dos Órgãos</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o grau supressão parcial dos Órgãos" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_SUPRESSAO_PARCIAL_ORGAOS.map(
                        (item: string, index: number) => (
                          <SelectItem key={`${item}-${index}`} value={item}>
                            {item}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Orificios_perfuracoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Orifícios/Perfurações</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione orifícios/perfurações" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_ORIFICIOS_PERFURACOES.map(
                        (item: string, index: number) => (
                          <SelectItem key={`${item}-${index}`} value={item}>
                            {item}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="galerias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Galerias</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione as galerias" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_GALERIA.map((item: string, index: number) => (
                        <SelectItem key={`${item}-${index}`} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="necroses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Necroses</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione as necroses" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_NECROSES.map((item: string, index: number) => (
                        <SelectItem key={`${item}-${index}`} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serrim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serrim</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o serrim" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_SERRIM.map((item: string, index: number) => (
                        <SelectItem key={`${item}-${index}`} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="exsudacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exsudação</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a exsudação" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_EXUDACAO.map((item: string, index: number) => (
                        <SelectItem key={`${item}-${index}`} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="novelos_fibra"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Novelos de Fibra</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione os novelos de fibra" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_NOVELOS_FIBRA.map(
                        (item: string, index: number) => (
                          <SelectItem key={`${item}-${index}`} value={item}>
                            {item}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Forma_caldeira"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forma da Caldeira</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione os novelos de fibra" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_FORMA_CALDEIRA.map(
                        (item: string, index: number) => (
                          <SelectItem key={`${item}-${index}`} value={item}>
                            {item}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Altura_v2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Altura</FormLabel>
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
              name="DAP_v2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DAP</FormLabel>
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CAP</FormLabel>
                  <p className="text-[13px]">
                    {Number(watchDap)
                      ? (Number(watchDap) * 3.14).toFixed(2)
                      : "Introduza um valor no DAP"}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idade_apro_v2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idade Aproximada</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a idade aproximada" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OPTIONS_IDADE_APROV_V2.map(
                        (item: string, index: number) => (
                          <SelectItem key={`${item}-${index}`} value={item}>
                            {item}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="Especie_Val"
              render={({ field }) => (
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
            /> */}

            {/* <FormField
              control={form.control}
              name="Outro_Nome_Comum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outro Nome Comum</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* <FormField
              control={form.control}
              name="Outra_Especie"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outra Espécie</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* <FormField
              control={form.control}
              name="Outra_Tip_Int"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outra Tip. Int.</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* <FormField
              control={form.control}
              name="grupos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grupos</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduza..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="POINT_X_G"
              render={({ field }) => (
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
              name="POINT_Y_G"
              render={({ field }) => (
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
              render={({ field }) => (
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
              render={({ field }) => (
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Criação: </FormLabel>
                  <FormControl>
                    <span>
                      {field.value
                        ? formatDate(field.value)
                        : "Data não disponível"}
                    </span>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="updatedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Atualização: </FormLabel>
                  <FormControl>
                    <span>
                      {field.value
                        ? formatDate(field.value)
                        : "Data não disponível"}
                    </span>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Gravar alterações</Button>
        </form>
      </Form>
    </div>
  );
}
