"use client";

import YearDetail from "@/components/yearpage/YearDetail";
import YearMovieBreadCrumb from "@/components/yearpage/YearMovieBreadCrumb";
import YearpageSkeleton from "@/components/YearpageSkeleton";
import { useParams } from "next/navigation";
import React, { Suspense } from "react";

function Yearpage() {
  const params = useParams();

  const year = Number(params.year);

  return (
    <div className="flex flex-col gap-2">
      <YearMovieBreadCrumb year={year} />
      <YearDetail />
    </div>
  );
}

export default Yearpage;
