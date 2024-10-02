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
import ShareButton from "./ShareButton";
import { User } from "lucia";
import EditMovieDetailsDialog from "./EditMovieDetailsDialog";

const MoviePage = async ({ id }: { id: string }) => {
  //   const id = params.id;
  const user = await getCurrentUser();
  const movie = await getMovie(id);

  let isAdmin = false;
  let isCreator = false;

  if (!movie) {
    throw new Error("Could not obtain movie id");
  }
  if (user) {
    const userAccountInfo = await getAccountByUserId(user.id);

    isAdmin = userAccountInfo?.user.role == "admin";
    isCreator = user.id == movie.createdUserId;
  }

  return (
    <Suspense fallback={<MovieSkeleton />}>
      <div className="h-full space-y-4">
        <div className="py-2">
          <DetailBreadCrumb year={movie.year} name={movie.moviename} />
        </div>
        <div className="bg-slate-40 flex flex-col items-center justify-center py-10 md:flex-row lg:h-[calc(100vh-150px)] lg:flex-row lg:gap-20">
          <div className="h-[350px] w-full lg:h-full lg:w-[500px]">
            <MoviePoster poster={movie.poster} />
          </div>
          <div className="w-full lg:h-full lg:w-[700px]">
            <MovieInfoSection
              name={movie.moviename}
              year={movie.year}
              description={movie.description}
              isAdmin={isAdmin}
              isCreator={isCreator}
              movieId={movie.movieId}
            />
            <ScoreSection
              totalRating={movie.totalRating}
              userRating={movie.userRating}
              currentUser={user}
            />
          </div>
        </div>
        <div className="h-full pb-48 pt-10">
          <OtherRaters movieslug={movie.movieslug} />
        </div>
      </div>
    </Suspense>
  );
};

export default MoviePage;

function MoviePoster({ poster }: { poster: string | null }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {poster ? (
        <div className="relative h-[350px] w-[230px] overflow-hidden rounded-md shadow-[2px_10px_23px_3px_#2d3748] lg:h-[500px] lg:w-[315px]">
          <Image
            src={poster}
            alt="movie"
            fill // Use layout instead of fill
            className="transition duration-500 hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex h-full w-2/3 flex-col items-center justify-center gap-2 rounded-xl bg-slate-700 shadow-md">
          <Image src="/imagena.png" alt="no image" width={120} height={120} />
          <p className="text-xl font-bold text-black lg:text-3xl">
            Image Unavailable
          </p>
        </div>
      )}
    </div>
  );
}

function MovieInfoSection({
  name,
  year,
  description,
  isAdmin,
  isCreator,
  movieId,
}: {
  name: string;
  year: number;
  description: string | null;
  isAdmin: boolean;
  isCreator: boolean;
  movieId: string;
}) {
  return (
    <section>
      <div className="flex flex-col py-5">
        <div className="flex items-baseline justify-center gap-5 lg:justify-start">
          <h1 className="pr-0 text-3xl font-semibold lg:text-5xl">{name}</h1>
        </div>
        <div className="flex items-center justify-center space-x-3 py-2 lg:justify-start">
          <p className="text-lg italic lg:text-xl">{`${year}`}</p>
          <ShareButton />
          {(isAdmin || isCreator) && (
            <EditMovieDetailsDialog
              moviename={name}
              year={year}
              description={description}
              movieId={movieId}
            />
          )}
          {isAdmin && <DeleteMovieDialog />}
        </div>

        <div className="text-1xl lg:text-md w-full py-10 lg:max-h-[200px] lg:min-h-[150px] lg:py-5">
          <p className="line-clamp-5 h-full w-full">
            {description ? description : "A short description of movie."}
          </p>
        </div>
      </div>
    </section>
  );
}

function ScoreSection({
  totalRating,
  userRating,
  currentUser,
}: {
  totalRating: number;
  userRating: number | undefined;
  currentUser: User | undefined;
}) {
  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-5 lg:flex-row lg:justify-around lg:gap-3">
        {/* BuzzButton */}
        <div className="flex w-[250px] flex-col items-center justify-center gap-5 rounded-xl border-2 border-slate-400 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-2 py-2 lg:h-[130px] lg:w-[250px] lg:px-3 lg:py-3">
          <div className="flex text-2xl shadow-slate-950 text-shadow lg:text-3xl">
            <p className="text-orange-300">Buzz</p>
            Score
          </div>
          <div className="text-3xl shadow-slate-950 text-shadow md:text-3xl lg:text-5xl">
            {totalRating == 0 ? "-" : totalRating.toFixed(1)}
          </div>
        </div>
        {!currentUser ? (
          <Link href={`/login`}>
            <div className="relative flex w-[250px] transform flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-slate-100 bg-slate-800 px-2 py-2 shadow-slate-900 transition-transform text-shadow hover:scale-105 lg:h-[130px] lg:max-h-[130px] lg:w-[250px] lg:gap-5 lg:px-3 lg:py-3">
              <span className="absolute right-0 top-0 size-4 animate-ping rounded-full bg-lime-500 opacity-75"></span>
              <span className="absolute right-0 top-0 inline-flex size-4 rounded-full bg-lime-600"></span>
              <div className="flex text-2xl lg:text-3xl">
                <p className="text-orange-300">Login to</p>
              </div>
              <div className="text-2xl md:text-2xl lg:text-3xl">Add score</div>
            </div>
          </Link>
        ) : userRating ? (
          <MovieDialog score={userRating} />
        ) : (
          <MovieNewScoreDialog />
        )}
      </div>
    </section>
  );
}
