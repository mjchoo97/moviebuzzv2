import React from "react";
import { Skeleton } from "./ui/skeleton";

const YearpageSkeleton = () => {
  return (
    <div className="h-full">
      <div className="flex space-y-3 justify-center items-center gap-10">
        <div className="space-y-5 items-center justify-center mt-1">
          <Skeleton className="h-[300px] w-[250px] rounded-xl" />
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <div className="space-y-5 items-center justify-center mt-1">
          <Skeleton className="h-[300px] w-[250px] rounded-xl" />
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <div className="space-y-5 items-center justify-center mt-1">
          <Skeleton className="h-[300px] w-[250px] rounded-xl" />
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
};

export default YearpageSkeleton;
