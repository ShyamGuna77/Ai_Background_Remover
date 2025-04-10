/* eslint-disable @next/next/no-img-element */
"use client";
import Dropzone from "react-dropzone";
import { FileRejection } from "react-dropzone";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";


export default function Home() {
  const [file, setFile] = useState<File | null>();
  const [error, setError] = useState("");
  const [outPutImage ,setoutPutImage] = useState<string | null>()
  const [base64image, setBase64Image] = useState<string | null>(null);

  const acceptedImages = {
    "image/jpeg": [".jpeg", ".png"],
  };

  const maxFileSize = 5 * 1024 * 1024;

  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 0) {
      setError("Please upload a PNG or JPEG of size below 5 mb");
      return;
    }
    handleDelete();
    console.log(acceptedFiles);
    setError("");
    setFile(acceptedFiles[0]);
    //connverting file into base64
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      const binaryStr = reader.result as string;
      setBase64Image(binaryStr);
    };
  };



  const fileSize = (size: number) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // delete fmn

  const handleDelete = () => {
    setFile(null)
    setoutPutImage(null)
  }

  const handlSubmit = async () => {
    const response = await fetch("/api/remove",{
      method:"POST",
      headers: {
         "Content-Type" :"application/json"
      },
      body:JSON.stringify({image:base64image})
     
    })
    const result = await response.json()
    console.log(result)
      if (result.error) {
        setError(result.error);
        return;
      }
      setoutPutImage(result.output)

  }


    useEffect(() => {
      let objectUrl: string | null = null;
      if (file) {
        objectUrl = URL.createObjectURL(file);
      }

      return () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      };
    }, [file]);

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
            <Dropzone
              onDrop={onDrop}
              maxSize={maxFileSize}
              multiple={false}
              accept={acceptedImages}
            >
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
          {error && (
            <div className="flex justify-center">
              <p className="text-md text-yellow-500">{error}</p>
            </div>
          )}

          <div className="flex items-center justify-center mt-6">
            <button
             onClick={handlSubmit}
             className="text-white bg-gradient-to-r from-purple-500 to-pink-500 text-center px-4 py-2 rounded-md  hover:bg-gradient-to-l">
              Remove Background
            </button>
          </div>
        </section>
        <section className="grid grid-cols-2 gap-4 mt-4">
          {file && (
            <>
              <div className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="object-cover w-full h-full"
                />
               <button className="absolute top-0 right-0 bg-yellow-500 text-black p-2"
               onClick={() =>  handleDelete()}>
                <FaTrashAlt className="w-4 h-4 hover:scale-125 duration-300 "/>
               </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gray-900/50 text-white text-md p-2 ">
                  {file.name}{" "}({fileSize(file.size)})
                </div>
              </div>
              <div className="flex items-center justify-center">
               {outPutImage && (
                <img src = {outPutImage} alt="randomInage" className = "object-cover w-full h-full" />
               )}
              </div>
            </>
          )}
        </section>
        ;
      </div>
    </>
  );
}
