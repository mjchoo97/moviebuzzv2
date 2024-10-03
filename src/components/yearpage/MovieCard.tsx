import Image from "next/image";
import Link from "next/link";
import React from "react";

const MovieCard = ({
  movie,
  medalpath,
}: {
  movie: Movie;
  medalpath?: string;
}) => {
  return (
    <div className="relative w-[275px] rounded-md">
      {medalpath && (
        <img
          src={medalpath}
          alt={movie.moviename}
          className="absolute left-0 top-0 z-10 w-12 object-cover"
        />
      )}

      <div className="flex justify-center bg-opacity-0">
        {movie.poster ? (
          <div className="aspect-auto-[460/729] relative h-[350px] w-[230px] cursor-pointer overflow-hidden rounded-md shadow-[2px_10px_23px_3px_#2d3748]">
            <Link href={`/movie/${movie.movieslug}`}>
              <Image
                src={movie.poster}
                alt={movie.moviename}
                fill // Use layout instead of fill
                className="transition duration-500 hover:scale-105"
              />
            </Link>
            <div className="absolute bottom-2 right-2 flex size-12 items-center justify-center rounded-full border-2 border-emerald-500 bg-zinc-950 text-xl shadow-emerald-400 text-shadow-sm">
              {movie.score.toFixed(1)}
            </div>
          </div>
        ) : (
          <div className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl bg-slate-700 shadow-md">
            <Image src="/imagena.png" alt="no image" width={120} height={120} />
            <p className="text-xl font-bold text-black lg:text-3xl">
              Image Unavailable
            </p>
          </div>
        )}
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="max-w-[220px] text-wrap py-3 text-xl font-bold">
          {movie.moviename}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
