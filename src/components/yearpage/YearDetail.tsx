"use client";

import { useParams } from "next/navigation";
import React, { Suspense } from "react";
import TopMovie from "./TopMovie";
import MovieTable from "./MovieTable";
import YearpageSkeleton from "../YearpageSkeleton";
import MobileTopMovie from "./MobileTopMovie";

const YearDetail = () => {
  const params = useParams();

  const yearNum = Number(params.year);

  return (
    <div className="w-full h-screen">
      <div className="flex justify-center items-center text-2xl py-4 drop-shadow-md">
        {yearNum}
      </div>
      <div className="md:hidden lg:hidden  w-full flex justify-center items-center">
        <MobileTopMovie year={yearNum} />
      </div>
      <div className="hidden md:w-full md:h-[450px] md:flex  md:justify-around md:items-center lg:w-full lg:h-[450px] lg:flex  lg:justify-around lg:items-center    ">
        <TopMovie year={yearNum} />
      </div>
      <div className="mt-5 flex justify-center">
        <MovieTable year={yearNum} />
      </div>
    </div>
  );
};

export default YearDetail;
