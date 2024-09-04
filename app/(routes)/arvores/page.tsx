import React from 'react'
import { HeaderArvores } from '../components/HeaderArvores'
import { ListArvores } from '../components/ListArvores'
import { ToastContainer } from 'react-toastify'

export default function Arvores() {
  return (
    <div>
      <ToastContainer />
      <HeaderArvores />
      <ListArvores />
    </div>
  )
}
