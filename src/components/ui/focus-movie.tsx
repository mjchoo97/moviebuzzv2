"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function FocusMovie({ movie }: { movie: Movie }) {
  return (
    <div className="max-w-xs w-full group/card">
      <Link href={`/movieyear/${movie.year}`}>
        <div
          className={cn(
            " cursor-pointer opacity-95 overflow-hidden relative card h-60 md:h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4"
          )}
          style={{
            backgroundImage: `url(${
              movie.poster ? movie.poster : "path/to/default-image.jpg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>

          <div className="text content bottom-5 absolute">
            <h1 className="font-bold text-2xl md:text-3xl text-slate-100 relative z-10 text-shadow-lg shadow-slate-950">
              {movie.year}
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
}
