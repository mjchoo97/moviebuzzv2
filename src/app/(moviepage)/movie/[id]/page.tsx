import MovieDialog from "@/components/MovieDialog";
import MovieNewScoreDialog from "@/components/MovieNewScoreDialog";
import MoviePage from "@/components/MoviePage";
import MovieSkeleton from "@/components/MovieSkeleton";
import { getMovie } from "@/lib/action";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import Image from "next/image";

import React, { Suspense, useState } from "react";
import { boolean } from "zod";

const MovieDetailsPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return (
    <Suspense fallback={<MovieSkeleton />}>
      <MoviePage id={id} />
    </Suspense>
  );
};

export default MovieDetailsPage;
