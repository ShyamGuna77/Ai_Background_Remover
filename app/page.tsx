

export default function Home() {
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
          <div className="w-full text-center border-4 border-gray-500 border-dashed rounded-md cursor-pointer mb-2 text-gray-500 ">
            DropZone will be Here
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
