import MovieDialog from "@/components/moviedetailpage/MovieDialog";
import MovieNewScoreDialog from "@/components/moviedetailpage/MovieNewScoreDialog";
import { auth, getMovie } from "@/lib/action";
import Image from "next/image";
import { Suspense } from "react";
import MovieSkeleton from "../MovieSkeleton";
import DetailBreadCrumb from "./DetailBreadCrumb";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";

const MoviePage = async ({ id }: { id: string }) => {
  //   const id = params.id;
  const user = await getCurrentUser();
  const movie = await getMovie(id);
  // console.log(movie);

  return (
    <Suspense fallback={<MovieSkeleton />}>
      <div className="">
        <div className="py-2">
          <DetailBreadCrumb year={movie.year} name={movie.moviename} />
        </div>
        <div className=" py-10 bg-slate-40 flex flex-col justify-center items-center md:flex-row lg:flex-row lg:h-[calc(100vh-100px)] lg:gap-20 ">
          <div className=" h-[350px] w-full lg:h-full lg:w-[500px]">
            <div className="relative w-full h-full  flex justify-center items-center">
              {movie.poster ? (
                <div className=" w-[230px] h-[350px] lg:w-[315px] lg:h-[500px] relative overflow-hidden  rounded-md  shadow-[2px_10px_23px_3px_#2d3748] ">
                  <Image
                    src={movie.poster}
                    alt="movie"
                    layout="fill" // Use layout instead of fill
                    objectFit="cover" // Ensures the image scales while maintaining its aspect ratio
                    className="hover:scale-105 transition duration-500"
                  />
                </div>
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
            <div className="py-5 flex flex-col">
              <div className=" flex items-baseline gap-5 justify-center lg:justify-start">
                <h1 className="text-3xl lg:text-5xl  font-semibold ">
                  {movie.moviename}
                </h1>
                <p className="text-xl lg:text-2xl bottom-0">{movie.year}</p>
              </div>

              <div className="w-full py-10 text-1xl lg:py-5 lg:text-md lg:min-h-[200px] lg:max-h-[250px] ">
                <p className="text-ellipsis overflow-hidden ... w-full h-full">
                  {movie.description
                    ? movie.description
                    : "A short description of movie."}
                </p>
              </div>
              <div className="flex flex-col items-center gap-5 lg:gap-3 lg:flex-row justify-center lg:justify-around  ">
                {/* BuzzButton */}
                <div className=" flex flex-col justify-center items-center lg:h-[130px] gap-5 w-[250px] lg:w-[250px] px-2 py-2 bg-gray-900 lg:px-3 lg:py-3 rounded-xl border-b-4  active:border-b-0 active:border-r-0 border-cyan-950 hover:bg-gray-800">
                  <div className="text-2xl lg:text-3xl flex">
                    <p className="text-orange-300">Buzz</p>Score
                  </div>
                  <div className="text-3xl md:text-3xl lg:text-5xl">
                    {movie.totalRating?.toFixed(2)}
                  </div>
                </div>
                {!user ? (
                  <Link href={`/login`}>
                    <div className=" flex flex-col justify-center items-center lg:h-[130px] lg:max-h-[130px] gap-2 lg:gap-5 w-[250px] lg:w-[250px]  px-2 py-2 bg-gray-700 lg:px-3 lg:py-3 rounded-xl border-b-4 border-r-4 active:border-b-0 active:border-r-0 border-x-slate-900 hover:bg-gray-800">
                      <div className="text-2xl lg:text-3xl flex">
                        <p className="text-orange-300">Login to</p>
                      </div>
                      <div className="text-2xl md:text-2xl lg:text-3xl">
                        Add score
                      </div>
                    </div>
                  </Link>
                ) : movie.userRating ? (
                  <MovieDialog score={movie.userRating} />
                ) : (
                  <MovieNewScoreDialog />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default MoviePage;
