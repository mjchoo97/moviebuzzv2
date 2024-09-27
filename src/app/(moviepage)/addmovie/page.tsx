"use client";

import { MovieForm } from "@/components/MovieForm";
import MovieSkeleton from "@/components/MovieSkeleton";
import { Suspense } from "react";

const AddMoviePage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 h-full my-9">
      <div className="flex justify-center items-center w-[400px] rounded-md md:w-[500px] lg:w-[500px] xl:w-[500px]">
        <Suspense fallback={"loading"}>
          <MovieForm />
        </Suspense>
      </div>
    </div>
  );
};

export default AddMoviePage;
