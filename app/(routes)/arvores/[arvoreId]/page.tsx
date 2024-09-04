import { redirect } from 'next/navigation'
import { ArvoreInformation } from '../../components/ArvoreInformation'
import { Tree } from '../../components/ListArvores/tree'
import { useState } from 'react'

export default async function ArvoreIdPage({
  params,
}: {
  params: { arvoreId: string }
}) {
  //console.log('ID Árvore: ', params.arvoreId);

  const arvore = await fetch(
    `${process.env.BASE_URL}/api/tree/get-tree-by-id/${params.arvoreId}`,
    {
      cache: 'no-cache',
    }
  )

  if (!arvore) {
    redirect('/')
    return null
  }

  const responseData = await arvore.json()
  // const tree: Tree = responseData.tree;
  //   //console.log('Response from endpoint:', responseData);

  const { trees } = responseData
  //console.log('Trees', responseData)
  // const {Localizacao, Nomecomum, Especie} = trees;

  // //console.log('Localizacao: ', Localizacao);
  // //console.log('Nome Comum: ', Nomecomum);
  // //console.log('Espécie: ', Especie);

  return (
    <div>
      {/* <div>Header</div> */}
      <ArvoreInformation arvore={trees} />
      {/* <div>Footer árvore</div> */}
    </div>
  )
}
