import { searchMovieAction } from "@/lib/action";
import React, { useEffect, useState } from "react";
import MovieCard from "../yearpage/MovieCard";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const SearchResult = async ({
  movie,
  page,
}: {
  movie: string;
  page: number;
}) => {
  const [searchMovies, setSearchMovies] = useState<Movie[]>([]); // Change 'any' to a more specific type if possible
  const [totalPages, setTotalPage] = useState<number>(100);
  const [totalMovie, setTotalMovie] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const resetMovieProps = () => {
    setSearchMovies([]);
    setTotalMovie(0);
  };

  useEffect(() => {
    resetMovieProps();
    const fetchMovies = async () => {
      setSearchMovies([]);
      try {
        const results = await searchMovieAction(movie, page);
        if (results?.movies && results.movies.length > 0) {
          setSearchMovies(results.movies);
          setTotalPage(results.totalPages);
          setTotalMovie(results.totalMovies);
        }
      } catch (e) {
        console.error(e);
        setError("An error occurred while searching for movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [movie]);

  if (!totalMovie && !loading) {
    return (
      <div className="flex h-full min-h-screen flex-col items-center justify-center gap-2">
        <div className="text-2xl">
          Could not find any results, considering adding it?
        </div>
        <Link
          href="/addmovie"
          className="mt-6 rounded-md bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600">
          Add Movie
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5">
        <div className="text-amber-400">
          <h1 className="flex items-center text-xl font-bold md:text-7xl">
            B
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              className="animate-spin"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
            </svg>{" "}
            zzing . . .
          </h1>
        </div>

        <p className="text-gray-500">
          Please wait a moment while we film the content.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-4">
      <h1 className="text-xl">{`Searched result for: ${movie} (${totalMovie})`}</h1>
      <div className="grid h-full grid-cols-1 place-items-center gap-2 md:grid-cols-3 lg:grid-cols-4">
        {searchMovies.map((movie) => (
          <div className="h-full" key={movie.moviename}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      {totalMovie && totalMovie > 8 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {page !== 1 && (
                <PaginationPrevious
                  href={`/searchmovie?movie=${movie}&page=${Number(page) - 1}`}
                />
              )}
            </PaginationItem>
            {page > 2 && <PaginationEllipsis />}
            {page !== 1 && (
              <PaginationItem>
                <PaginationLink
                  href={`/searchmovie?movie=${movie}&page=${Number(page) - 1}`}>
                  {Number(page) - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink
                href={`/searchmovie?movie=${movie}&page=${Number(page)}`}
                className="bg-yellow-600">
                {page}
              </PaginationLink>
            </PaginationItem>
            {page < totalPages && (
              <PaginationItem>
                <PaginationLink
                  href={`/searchmovie?movie=${movie}&page=${Number(page) + 1}`}>
                  {Number(page) + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              {page + 1 < totalPages && <PaginationEllipsis />}
            </PaginationItem>
            <PaginationItem>
              {page < totalPages && (
                <PaginationNext
                  href={`/searchmovie?movie=${movie}&page=${Number(page) + 1}`}
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default SearchResult;
