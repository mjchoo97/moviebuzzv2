"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth, getMovieByYear } from "@/lib/action";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

import RowComp from "./RowComp";
import { useRouter } from "next/navigation";

const MovieTable = ({ year }: { year: number }) => {
  const router = useRouter();
  const [user, setUser] = useState<User>({ userId: null });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const allmovies = await getMovieByYear(year);
        const sortedMovies = allmovies.sort((a, b) => b.score - a.score);
        setMovies(sortedMovies);

        const userauth = await auth();
        setUser(userauth);
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
      <div className="h-screen lg:mt-10 lg:w-2/3">
        <div className="flex justify-start lg:ml-10">
          <div className="mt-1 flex flex-col gap-5">
            <Skeleton className="h-16 w-[250px] rounded-xl lg:w-[800px]" />
            <Skeleton className="h-6 w-[200px] lg:w-[400px]" />
            <Skeleton className="h-4 lg:w-[200px]" />
          </div>
        </div>
      </div>
    );

  if (!movies.length)
    return (
      <div className="h-screen lg:mt-10 lg:w-2/3">
        <div className="flex justify-start lg:ml-10">
          <div className="mt-1 flex flex-col gap-5">
            <Skeleton className="h-16 w-[250px] rounded-xl lg:w-[800px]" />
            <Skeleton className="h-6 w-[200px] lg:w-[400px]" />
            <Skeleton className="h-4 lg:w-[200px]" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="mt-6 flex w-full items-center justify-start md:w-3/4 lg:w-3/4 lg:justify-center">
      <Table className="w-full">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow className="text-lg">
            <TableHead className="w-[100px] text-center">Rank</TableHead>
            <TableHead className="w-2/3">Name</TableHead>
            <TableHead className="text-center">Buzz Score</TableHead>
            <TableHead className="text-center">Your Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie, i) => (
            <RowComp
              key={movie.moviename}
              movie={movie}
              rank={i}
              user={user}
              onClick={() => router.push(`/movie/${movie.movieslug}`)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MovieTable;
