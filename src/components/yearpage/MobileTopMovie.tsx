import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getMovieByYear } from "@/lib/action";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Skeleton } from "../ui/skeleton";

const MobileTopMovie = ({ year }: { year: number }) => {
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
        <div className="flex space-y-3 justify-center items-center gap-10">
          <div className="space-y-5 items-center justify-center mt-1">
            <Skeleton className="h-[300px] w-[250px] rounded-xl" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );

  if (!movies.length) return <div>No top movies found for the year {year}</div>;

  return (
    <div className="">
      <Carousel className="w-[280px]">
        <CarouselContent className="">
          {movies.length > 2 ? (
            <>
              <CarouselItem className="flex justify-center">
                <MovieCard movie={movies[0]} medalpath={medalPaths[0]} />
              </CarouselItem>
              <CarouselItem className="flex justify-center">
                <MovieCard movie={movies[1]} medalpath={medalPaths[1]} />
              </CarouselItem>
              <CarouselItem className="flex justify-center">
                <MovieCard movie={movies[2]} medalpath={medalPaths[2]} />
              </CarouselItem>
            </>
          ) : movies.length > 1 ? (
            <>
              {/* 1st Place */}

              <CarouselItem className="flex justify-center">
                <MovieCard movie={movies[0]} medalpath={medalPaths[0]} />
              </CarouselItem>
              <CarouselItem className="flex justify-center">
                <MovieCard movie={movies[1]} medalpath={medalPaths[1]} />
              </CarouselItem>
            </>
          ) : (
            <>
              <CarouselItem className="flex justify-center">
                <MovieCard movie={movies[0]} medalpath={medalPaths[0]} />
              </CarouselItem>
            </>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MobileTopMovie;
