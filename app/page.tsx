
"use client"
import Dropzone from "react-dropzone";
import { FileRejection } from "react-dropzone";
import { useState } from "react";

export default function Home() {
  const [file ,setFile] = useState<File | null>()
  const [error,setError] = useState("")

  const acceptedImages = {
    "image/jpeg": [".jpeg", ".png"],
  };

   const maxFileSize = 5 * 1024 * 1024;

   const onDrop = (acceptedFiles:Files[], rejectedFiles:FileRejection[]) => {
    if(rejectedFiles.length>0){
      setError("Please upload a PNG or JPEG of size below 5 mb")
      return 
    }
     console.log(acceptedFiles)
     setError("")
    setFile(acceptedFiles[0])

   }









  return (
    <>
      <div className="max-w-3xl mx-auto my-10 px-4">
        {/* Header Section */}
        <section className="text-center mb-10">
          <h1 className=" font-bold text-transparent bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block bg-clip-text text-5xl">
            Background Remover
          </h1>
        </section>

        {/* Dropzone Section */}
        <section className="w-full max-w-lg mx-auto mb-12">
          <div className="w-full text-center border-4 border-gray-500 border-dashed rounded-md cursor-pointer mb-2 p-5 text-gray-500 ">
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  style={{ border: "2px dashed blue", padding: "20px" }}
                >
                  <input {...getInputProps()} />
                  <p>Drag & drop files here, or click to select files</p>
                </div>
              )}
            </Dropzone>
          </div>
          <div className="flex items-center justify-center mt-6">
            <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 text-center px-4 py-2 rounded-md  hover:bg-gradient-to-l">
              Remove Background
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
