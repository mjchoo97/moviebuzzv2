import MovieDialog from "@/components/moviedetailpage/MovieDialog";
import MovieNewScoreDialog from "@/components/moviedetailpage/MovieNewScoreDialog";
import { auth, getMovie } from "@/lib/action";
import Image from "next/image";
import { Suspense } from "react";
import MovieSkeleton from "../MovieSkeleton";
import DetailBreadCrumb from "./DetailBreadCrumb";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import OtherRaters from "./OtherRaters";
import DeleteMovieDialog from "./DeleteMovieDialog";
import { getAccountByUserId } from "@/data-access/accounts";

const MoviePage = async ({ id }: { id: string }) => {
  //   const id = params.id;
  const user = await getCurrentUser();
  const movie = await getMovie(id);

  let isAdmin;
  if (user) {
    const userAccountInfo = await getAccountByUserId(user.id);

    isAdmin = userAccountInfo?.user.role == "admin";
  }

  return (
    <Suspense fallback={<MovieSkeleton />}>
      <div className="h-full space-y-4">
        <div className="py-2">
          <DetailBreadCrumb year={movie.year} name={movie.moviename} />
        </div>
        <div className=" py-10 bg-slate-40 flex flex-col justify-center items-center md:flex-row lg:flex-row lg:h-[calc(100vh-150px)] lg:gap-20 ">
          <div className=" h-[350px] w-full lg:h-full lg:w-[500px]">
            <div className="relative w-full h-full  flex justify-center items-center">
              {movie.poster ? (
                <div className=" w-[230px] h-[350px] lg:w-[315px] lg:h-[500px] relative overflow-hidden  rounded-md  shadow-[2px_10px_23px_3px_#2d3748] ">
                  <Image
                    src={movie.poster}
                    alt="movie"
                    fill // Use layout instead of fill
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
                <h1 className="text-3xl lg:text-5xl  font-semibold pr-0 ">
                  {movie.moviename}
                </h1>
              </div>
              <div className="flex justify-center lg:justify-start space-x-2 py-2 ">
                <p className="text-lg lg:text-xl italic">{`${movie.year}`}</p>
                {isAdmin && <DeleteMovieDialog />}
              </div>

              <div className="w-full py-10 text-1xl lg:py-5 lg:text-md lg:min-h-[200px] lg:max-h-[250px] ">
                <p className="line-clamp-5 w-full h-full">
                  {movie.description
                    ? movie.description
                    : "A short description of movie."}
                </p>
              </div>
              <div className="flex flex-col items-center gap-5 lg:gap-3 lg:flex-row justify-center lg:justify-around  ">
                {/* BuzzButton */}
                <div className=" flex flex-col justify-center items-center lg:h-[130px] gap-5 w-[250px] lg:w-[250px] px-2 py-2 lg:px-3 lg:py-3 rounded-xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-2 border-slate-400">
                  <div className="text-2xl lg:text-3xl flex text-shadow shadow-slate-950">
                    <p className="text-orange-300 ">Buzz</p>
                    Score
                  </div>
                  <div className="text-3xl md:text-3xl lg:text-5xl text-shadow shadow-slate-950">
                    {movie.totalRating == 0
                      ? "-"
                      : movie.totalRating.toFixed(1)}
                  </div>
                </div>
                {!user ? (
                  <Link href={`/login`}>
                    <div className="relative text-shadow shadow-slate-900 flex flex-col justify-center items-center lg:h-[130px] lg:max-h-[130px] gap-2 lg:gap-5 w-[250px] lg:w-[250px]  px-2 py-2 lg:px-3 lg:py-3 rounded-xl bg-slate-800 border-2 border-slate-100 overflow-hidden  transition-transform transform hover:scale-105">
                      <span className="top-0 right-0 animate-ping absolute  size-4 rounded-full bg-lime-500 opacity-75"></span>
                      <span className="top-0 right-0 absolute inline-flex rounded-full size-4  bg-lime-600 "></span>
                      <div className="text-2xl lg:text-3xl flex ">
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
        <div className="h-full  pb-48">
          <OtherRaters movieslug={movie.movieslug} />
        </div>
      </div>
    </Suspense>
  );
};

export default MoviePage;
