import {redirect} from 'next/navigation';
import {ArvoreInformation} from '../../components/ArvoreInformation';
// import { auth } from '@clerk/nextjs/server';

export default async function ArvoreIdPage({
  params,
}: {
  params: {arvoreId: string};
}) {
  console.log('ID Árvore: ', params.arvoreId);

  //   const {userId} = auth()

  //   if(!userId) {
  //     redirect('/sign-in')
  //   }

  const arvore = await fetch(
    `${process.env.BASE_URL}/api/tree/get-tree-by-id/${params.arvoreId}`
  );

  if (!arvore) {
    redirect('/');
  }

  const responseData = await arvore.json();
  //   console.log('Response from endpoint:', responseData);

  const {trees} = responseData;
  const {Localizacao, Nomecomum, Especie} = trees;

  console.log('Localizacao: ', Localizacao);
  console.log('Nome Comum: ', Nomecomum);
  console.log('Espécie: ', Especie);

  return (
    <div>
      <div>Header</div>
      <ArvoreInformation arvore={trees} />
      <div>Footer árvore</div>
    </div>
  );
}
