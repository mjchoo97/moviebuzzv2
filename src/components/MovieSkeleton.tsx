import React from "react";
import { Skeleton } from "./ui/skeleton";

const MovieSkeleton = () => {
  return (
    <div className="h-screen flex space-y-3 justify-center  mt-24 gap-5">
      <div className="hidden lg:flex md:flex">
        <Skeleton className="h-[500px] w-[300px] rounded-xl" />
      </div>
      <div className="space-y-5 mt-14 items-center justify-center h-full">
        <Skeleton className="h-60 lg:h-8 w-[300px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default MovieSkeleton;
