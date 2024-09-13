'use client'
import { useState } from 'react'

export default function DragAndDrop() {
  const [file, setFile] = useState<string>()
  const [fileEnter, setFileEnter] = useState(false)
  return (
    <div className="container mx-auto max-w-5xl px-4">
      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setFileEnter(true)
          }}
          onDragLeave={(e) => {
            setFileEnter(false)
          }}
          onDragEnd={(e) => {
            e.preventDefault()
            setFileEnter(false)
          }}
          onDrop={(e) => {
            e.preventDefault()
            setFileEnter(false)
            if (e.dataTransfer.items) {
              ;[...e.dataTransfer.items].forEach((item, i) => {
                if (item.kind === 'file') {
                  const file = item.getAsFile()
                  if (file) {
                    let blobUrl = URL.createObjectURL(file)
                    setFile(blobUrl)
                  }
                  //console.log(`items file[${i}].name = ${file?.name}`);
                }
              })
            } else {
              ;[...e.dataTransfer.files].forEach((file, i) => {
                //console.log(`… file[${i}].name = ${file.name}`);
              })
            }
          }}
          className={`${
            fileEnter ? 'border-4' : 'border-2'
          } flex h-32 w-64 max-w-xs flex-col justify-center border-dashed bg-white/60`}
        >
          <label
            htmlFor="file"
            className="flex h-full flex-col justify-center text-center text-black"
          >
            Clique para fazer upload, ou arraste foto
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={(e) => {
              //console.log(e.target.files);
              let files = e.target.files
              if (files && files[0]) {
                let blobUrl = URL.createObjectURL(files[0])
                setFile(blobUrl)
              }
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <object
            className="h-full w-full max-w-xs rounded-md"
            data={file}
            type="image/png"
          />
          <button
            onClick={() => setFile('')}
            className="mt-10 rounded bg-red-600 px-4 py-2 uppercase tracking-widest text-white outline-none"
          >
            Adicionar
          </button>
          <button
            onClick={() => setFile('')}
            className="mt-2 rounded bg-red-600 px-4 py-2 uppercase tracking-widest text-white outline-none"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  )
}
