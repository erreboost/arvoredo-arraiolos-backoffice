import { SubmitHandler, useForm } from 'react-hook-form'
import Modal from '../Modal/Modal'
import { deleteTree } from '@/app/api/editors'

interface ClientConfirmDeleteModalProps {
  treeToDeleteId: any
  setShowDeleteModal: any
}

const ConfirmDeleteModal: React.FC<ClientConfirmDeleteModalProps> = ({
  treeToDeleteId,
  setShowDeleteModal,
}) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<any>()

  const onSubmit: SubmitHandler<any> = async (newNote: any) => {
    deleteTree(treeToDeleteId), setShowDeleteModal(false)
  }
  return (
    <Modal closeModal={setShowDeleteModal}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex h-[150px] w-[300px] flex-col gap-5"
      >
        <div>
          <h3 className="text-center text-[18px] font-semibold">
            Tem certeza que quer deletar a árvore?
          </h3>
        </div>

        <button
          type="submit"
          className="mt-[25px] h-[40px] w-full rounded-md bg-red-600 text-[18px] font-semibold text-white hover:brightness-75"
        >
          {' '}
          Deletar{' '}
        </button>
      </form>
    </Modal>
  )
}
export default ConfirmDeleteModal
