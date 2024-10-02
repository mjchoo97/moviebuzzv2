"use client";
import { getMovieByYear } from "@/lib/action";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import MovieCard from "./MovieCard";

const TopMovie = ({ year }: { year: number }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const medalPaths = ["/medal.png", "/medal-2.png", "/medal-3.png"];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const allmovies = await getMovieByYear(year);
        const sortedMovies = allmovies.sort((a, b) => b.score - a.score);

        setMovies(sortedMovies.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch movies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [year]);

  if (loading)
    return (
      <div>
        <div className="flex items-center justify-center gap-10 space-y-3">
          <div className="mt-1 items-center justify-center space-y-5">
            <Skeleton className="h-[300px] w-[250px] rounded-xl" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className="mt-1 items-center justify-center space-y-5">
            <Skeleton className="h-[300px] w-[250px] rounded-xl" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className="mt-1 items-center justify-center space-y-5">
            <Skeleton className="h-[300px] w-[250px] rounded-xl" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  if (!movies.length) return <div>No top movies found for the year {year}</div>;

  return (
    <div className="hidden md:flex md:h-[450px] md:w-full md:items-center md:justify-around lg:flex lg:h-[500px] lg:w-full lg:items-center lg:justify-center lg:gap-5">
      {movies.length > 2 ? (
        <div className="flex h-full gap-5 py-4">
          <div className="mt-12">
            <MovieCard movie={movies[1]} medalpath={medalPaths[1]} />
          </div>
          <MovieCard movie={movies[0]} medalpath={medalPaths[0]} />
          <div className="mt-12">
            <MovieCard movie={movies[2]} medalpath={medalPaths[2]} />
          </div>
        </div>
      ) : movies.length > 1 ? (
        <div className="flex h-full gap-5 py-4">
          {/* 1st Place */}

          <MovieCard movie={movies[0]} medalpath={medalPaths[0]} />
          <MovieCard movie={movies[1]} medalpath={medalPaths[1]} />
        </div>
      ) : (
        <>
          <MovieCard movie={movies[0]} medalpath={medalPaths[0]} />
        </>
      )}
    </div>
  );
};

export default TopMovie;
