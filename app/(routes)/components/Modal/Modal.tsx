import { X } from 'lucide-react'

const Modal: React.FC<any> = ({ children, closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="fixed h-auto w-auto rounded-[20px] bg-white p-10">
        <button
          onClick={() => closeModal(false)}
          className="absolute right-5 top-5 rounded-[60px] p-2 hover:bg-gray-300"
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
