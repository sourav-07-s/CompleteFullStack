import React from "react";

const CreatePost = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-black text-white">
          <h1 className="text-3xl font-extrabold mb-10 font-serif">Create Post </h1>

      <form className="flex flex-col gap-5 w-1/3 p-6 rounded-xl">

        
        <div className="flex justify-center">
          <input
            type="file"
            name="Image"
            accept="image/*"
            className="text-sm text-white
                       file:mr-4
                       file:rounded-2xl
                       file:border-0
                       file:bg-blue-600
                       file:px-4
                       file:py-2
                       file:text-white
                       file:cursor-pointer
                       hover:file:bg-blue-700"
          />
        </div>

        
        <input
          type="text"
          name="Caption"
          placeholder="Enter a Caption for post"
          required
          className="w-full border-none bg-gray-700 p-3
                     rounded-3xl text-center
                     placeholder:text-white
                     outline-none"
        />

       
        <button
          type="submit"
          className="px-5 py-3 text-sm bg-green-600
                     text-white rounded-3xl
                     hover:bg-green-700
                     transition mx-auto"
        >
          Submit
        </button>

      </form>

    </section>
  );
};

export default CreatePost;