'use client'
import { getEditorsUsers, updateUserType } from '@/app/api/editors'
import { useAuths } from '@/app/context/AuthContext'
import { CustomIcon } from '@/components/CustomIcon'
import { BarChart } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export function Editors() {
  const { token, setEditors, userType, editors } = useAuths()

  useEffect(() => {
    if (token) {
      getEditorsUsers(setEditors)
      // //console.log('Editors Users', editors)
    }
  }, [token, setEditors])

  const { handleSubmit, register, reset } = useForm({})
  const onSubmit = (data: any) => {
    // //console.log('Editor', editors)
    reset()
    updateUserType(data.editor, 'editor')
    getEditorsUsers(setEditors)
  }

  const removeEditor = (email: string) => {
    updateUserType(email, 'user')
    getEditorsUsers(setEditors)
  }

  return (
    <div className="flex flex-col rounded-lg bg-background p-5 shadow-sm">
      <div className="items-centerflex-col flex gap-x-2">
        <div className="flex gap-[5px]">
          <CustomIcon icon={BarChart} />
          <p className="text-xl">Editores</p>
        </div>
      </div>
      {userType && userType.userGroup === 'administrator' ? (
        <form
          className="mt-[10px] flex items-center gap-[10px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('editor')}
            name={'editor'}
            className="mt-1 block w-[70%] rounded-sm border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <button
            type="submit"
            className="h-[40px] w-[150px] rounded bg-gray-700 text-sm font-semibold text-white hover:brightness-50"
          >
            Adicionar editor +
          </button>
        </form>
      ) : null}
      <h3 className="mt-[20px] font-semibold">Editores</h3>
      {editors?.map((item, index) => (
        <div
          className="inline-block flex items-center justify-between bg-gray-200 px-[10px]"
          key={item.email}
        >
          <p className="mt-[5px] p-[10px]">{item.email}</p>
          <button
            className="h-[35px] w-[100px] rounded bg-red-500 text-sm font-semibold text-white hover:brightness-50"
            onClick={() => removeEditor(item.email)}
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  )
}
