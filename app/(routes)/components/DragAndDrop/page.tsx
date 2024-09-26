//@ts-nocheck
"use client";
import { useState, useRef, Key, useEffect } from "react";

export default function DragAndDrop({ files, setFiles }: any) {
  const [fileEnter, setFileEnter] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filesToShow, setFilesToShow] = useState<File[] | string[]>([]);

  useEffect(() => console.log("FIlestoshow", filesToShow), [filesToShow]);

  const handleFiles = async (newFiles: FileList | File[]) => {
    const existingFileCount = files.length;
    const remainingSlots = 2 - existingFileCount;

    if (remainingSlots > 0) {
      const newFileList = [...newFiles].slice(0, remainingSlots);
      setFilesToShow((prevFiles: any) => [...prevFiles, ...newFileList]);

      await uploadFiles(newFileList);
    }
  };

  const uploadFiles = async (filesToUpload: File[]) => {
    const formData = new FormData();

    filesToUpload.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await fetch(
        `${BASE_URL}/files/upload?destinationFolder=trees`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      console.log("Upload successful:", result);
      setFiles((prevFiles: any) => [...prevFiles, ...result?.filePaths]);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setFileEnter(true);
        }}
        onDragLeave={() => setFileEnter(false)}
        onDrop={(e) => {
          e.preventDefault();
          setFileEnter(false);
          if (e.dataTransfer.items) {
            const droppedFiles = [...e.dataTransfer.items]
              .filter((item) => item.kind === "file")
              .map((item) => item.getAsFile())
              .filter((file): file is File => !!file);
            handleFiles(droppedFiles);
          } else {
            handleFiles(e.dataTransfer.files);
          }
        }}
        className={`${
          fileEnter ? "border-4" : "border-2"
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
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => {
            const { files } = e.target;
            if (files) handleFiles(files);
          }}
        />
      </div>

      {filesToShow.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {filesToShow.map(
            (file: Blob | MediaSource, index: Key | null | undefined) => (
              <div key={index} className="relative max-w-xs">
                <object
                  className="h-full w-full max-w-xs rounded-md"
                  data={URL.createObjectURL(file)}
                  type="image/png"
                />
                <button
                  onClick={() =>
                    setFilesToShow((prevFiles: any[]) =>
                      prevFiles.filter((_: any, i: any) => i !== index),
                    )
                  }
                  className="absolute top-0 right-0 rounded-full bg-red-600 p-2 py-1 text-white"
                >
                  x
                </button>
              </div>
            ),
          )}
        </div>
      )}

      <div className="mt-4 flex space-x-2">
        {files.length < 2 && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="rounded bg-blue-600 px-4 py-2 uppercase tracking-widest text-white outline-none"
          >
            Adicionar
          </button>
        )}
        <button
          onClick={() => setFilesToShow([])}
          className="rounded bg-red-600 px-4 py-2 uppercase tracking-widest text-white outline-none"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
