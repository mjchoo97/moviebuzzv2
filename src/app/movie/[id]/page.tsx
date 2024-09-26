"use client";

import { getMovie } from "@/lib/action";

import Image from "next/image";
import React, { useEffect, useState } from "react";

type Movie = {
  moviename: string;
  year: number;
  description: string | null;
  poster: string | null;
  userRating: number | null;
  totalRating: number | null;
};

const MoviePage = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  // const movie = getMovie(id);
  // console.log(movie);

  const [movie, setMovie] = useState<Movie>({
    moviename: "",
    description: "",
    year: 0,
    poster: null,
    userRating: null,
    totalRating: null,
  });

  useEffect(() => {
    const fetchMovie = async () => {
      const fetchedMovie = await getMovie(id);
      setMovie(fetchedMovie);
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading</div>;
  }
  console.log(movie);

  return (
    <div>
      <div className="py-10 bg-slate-40 flex flex-col justify-center items-center md:flex-row lg:flex-row lg:h-[calc(100vh-200px)] lg:gap-20 ">
        <div className=" h-[350px] w-full lg:h-full lg:w-[500px]">
          <div className="relative w-full h-full ">
            {movie.poster ? (
              <Image
                src={movie.poster}
                alt="movie"
                layout="fill" // Use layout instead of fill
                objectFit="contain" // Ensures the image scales while maintaining its aspect ratio
              />
            ) : (
              <div className="bg-slate-700 h-full shadow-md flex flex-col justify-center items-center rounded-xl gap-2">
                <Image
                  src="/imagena.png"
                  alt="no image"
                  width={120}
                  height={120}
                />
                <p className="font-bold text-xl lg:text-3xl text-black ">
                  Image Unavailable
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:h-full  lg:w-[700px] ">
          <div className="py-5 flex flex-col  ">
            <div className="text-3xl lg:text-6xl left-0">{movie.moviename}</div>
            <div className="w-full py-10 text-1xl lg:text-lg lg:h-[300px] ">
              <p className="text-ellipsis overflow-hidden ... w-full h-full">
                {movie.description
                  ? movie.description
                  : "A short description of movie."}
              </p>
            </div>
            <div className="flex flex-col items-center gap-5 lg:gap-3 lg:flex-row justify-center lg:justify-evenly  ">
              {/* BuzzButton */}
              <div className=" flex flex-col justify-center items-center gap-5 w-[250px] lg:w-[300px] px-2 py-2 bg-gray-900 lg:px-4 lg:py-4 rounded-xl border-b-4 border-r-4 active:border-b-0 active:border-r-0 border-cyan-950 hover:bg-gray-800">
                <div className="text-3xl lg:text-4xl flex">
                  <p className="text-orange-300">Buzz</p>Score
                </div>
                <div className="text-3xl md:text-3xl lg:text-5xl">
                  {movie.totalRating}
                </div>
              </div>

              {/* UserButton */}

              {/* <div className=" flex flex-col justify-center items-center gap-5 w-[250px] px-2 py-2 lg:w-[300px] bg-green-700 lg:px-4 lg:py-4 rounded-xl border-b-4 border-r-4 active:border-b-0 active:border-r-0 border-green-900 hover:bg-gray-800">
                <div className="text-3xl lg:text-4xl flex">
                  <p className="text-orange-300">{`Your `}</p> Score
                </div>
                <div className="text-3xl md:text-3xl lg:text-5xl">
                  {movie.userRating}
                  <MovieAlertDialog />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white w-full">Bottom section</div>
    </div>
  );
};

export default MoviePage;
