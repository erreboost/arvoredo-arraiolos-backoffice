import {User} from 'lucide-react';
import {ArvoreInformationProps} from './ArvoreInformation.types';
import Image from 'next/image';
import {ArvoreForm} from '../ArvoreForm';

export function ArvoreInformation({arvore}: ArvoreInformationProps) {
  const baseUrl = process.env.BASE_URL;

  if (!baseUrl) {
    console.error('NEXT_PUBLIC_BASE_URL is not defined');
    return <div>Error: Base URL is not defined</div>;
  }

  // console.log('Base URL:', baseUrl);
  // console.log('Fotos:', arvore.Fotos);

  const imageUrls = Array.isArray(arvore?.Fotos)
    ? arvore?.Fotos.map((foto) => `${baseUrl}/${foto}`)
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 lg:gap-x-10 gap-y-4">
      <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4">
        <div className="flex gap-4">
          {imageUrls.map((url, index) => (
            <div key={index} className="w-1/2">
              <Image
                src={url}
                alt={`Foto Árvore ${index + 1}`}
                width={200}
                height={200}
                className="rounded-lg mb-3"
                style={{objectFit: 'cover'}}
              />
            </div>
          ))}
        </div>
        <ArvoreForm arvore={arvore} />
      </div>
      {/* <div className="rounded-lg bg-background shadow-md hover:shadow-lg p-4 h-min">
        <div className="flex items-center justify-between gap-x-2">
          <div className="flex items-center gap-x-2 ">
            <User className="h-5 w-5" />
            Usuário
          </div>
          <div>
            <p>Novo</p>
          </div>
        </div>
        <p>Listar árvores...</p>
      </div> */}
    </div>
  );
}
