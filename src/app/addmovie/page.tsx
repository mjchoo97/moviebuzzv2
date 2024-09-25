import { MovieForm } from "@/components/MovieForm";
import React from "react";

const AddMoviePage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 h-full my-9">
      <div className="text-2xl font-bold">
        <h1>Add A New Movie!</h1>
      </div>
      <div className="flex justify-center items-center w-[400px] rounded-md border-4 md:w-[500px] lg:w-[500px] xl:w-[500px]">
        <MovieForm />
      </div>
    </div>
  );
};

export default AddMoviePage;
