import MoviePage from "@/components/moviedetailpage/MoviePage";
import MovieSkeleton from "@/components/MovieSkeleton";

import React, { Suspense, useState } from "react";

const MovieDetailsPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return (
    <Suspense fallback={<MovieSkeleton />}>
      <MoviePage id={id} />
    </Suspense>
  );
};

export default MovieDetailsPage;
