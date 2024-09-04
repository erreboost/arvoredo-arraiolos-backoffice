import { Tree } from '../ListArvores/tree'

export type ArvoreFormTypes = {
  arvore?: Partial<Tree>
  type: 'edit' | 'create'
}
