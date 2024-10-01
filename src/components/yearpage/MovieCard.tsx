import Image from "next/image";
import Link from "next/link";
import React from "react";

const MovieCard = ({
  movie,
  medalpath,
}: {
  movie: Movie;
  medalpath: string;
}) => {
  return (
    <div className="w-[275px]  rounded-md relative ">
      <img
        src={medalpath}
        alt={movie.moviename}
        className="w-12 z-10 absolute top-0 left-0 object-cover "
      />
      <div className="flex  justify-center bg-opacity-0  ">
        {movie.poster ? (
          <div className="cursor-pointer w-[230px] h-[350px] relative overflow-hidden  rounded-md aspect-auto-[460/729] shadow-[2px_10px_23px_3px_#2d3748]">
            <Link href={`/movie/${movie.movieslug}`}>
              <Image
                src={movie.poster}
                alt={movie.moviename}
                fill // Use layout instead of fill
                className=" hover:scale-105 transition duration-500"
              />
            </Link>
            <div className="text-shadow-sm shadow-emerald-400  rounded-full size-12 absolute bottom-2 right-2 text-xl bg-zinc-950 flex items-center justify-center border-2 border-emerald-500">
              {movie.score.toFixed(1)}
            </div>
          </div>
        ) : (
          <div className="bg-slate-700 h-full shadow-md flex flex-col justify-center items-center rounded-xl gap-2 cursor-pointer">
            <Image src="/imagena.png" alt="no image" width={120} height={120} />
            <p className="font-bold text-xl lg:text-3xl text-black ">
              Image Unavailable
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center w-full ">
        <div className="max-w-[220px] text-wrap text-xl py-3 font-bold  ">
          {movie.moviename}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
