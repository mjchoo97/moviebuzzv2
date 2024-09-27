import React from "react";
import { Skeleton } from "./ui/skeleton";

const MovieSkeleton = () => {
  return (
    <div className="flex space-y-3 justify-center items-center gap-5">
      <Skeleton className="h-[500px] w-[300px] rounded-xl" />
      <div className="space-y-5 items-center justify-center mt-1">
        <Skeleton className="h-8 w-[300px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default MovieSkeleton;
