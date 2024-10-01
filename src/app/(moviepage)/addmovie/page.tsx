import AddMovieBreadCrumb from "@/components/addmovie/AddMovieBreadCrumb";
import { MovieForm } from "@/components/addmovie/MovieForm";

import MovieSkeleton from "@/components/MovieSkeleton";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const AddMoviePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <AddMovieBreadCrumb />
      <div className="flex flex-col justify-center items-center gap-5 h-full my-9">
        <div className="flex justify-center items-center w-full rounded-md md:w-[500px] lg:w-[500px] xl:w-[500px]">
          <Suspense fallback={<MovieSkeleton />}>
            <MovieForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AddMoviePage;
