"use client";

import { getMovieByYear } from "@/lib/action";
import { useParams } from "next/navigation";
import React from "react";
import TopMovie from "./TopMovie";

const YearDetail = async () => {
  const params = useParams();

  const yearNum = Number(params.year);

  return (
    <div className="w-full h-screen ">
      <div className="hidden md:w-full md:h-[450px] md:flex  md:justify-around md:items-center lg:w-full lg:h-[450px] lg:flex  lg:justify-around lg:items-center    ">
        <TopMovie year={yearNum} />
      </div>
    </div>
  );
};

export default YearDetail;
