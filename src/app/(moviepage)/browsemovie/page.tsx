import React from "react";
import { getDistinctMovieByYear } from "@/lib/action";
import { FocusMovie } from "@/components/ui/focus-movie";

const BrowseMoviepage = async () => {
  const distictYears = await getDistinctMovieByYear();

  if (!distictYears) {
    return <div>No Movie yet</div>;
  }

  return (
    <div className="min-h-screen flex   flex-col gap-5">
      <div className="text-3xl py-5 text-neutral-400 text-shadow shadow-slate-950">
        Browse all our movies
      </div>
      <div className="justify-items-center grid grid-cols-1 md:grid-cols-3 gap-5 ">
        {distictYears.map((distinctYear) => (
          <FocusMovie movie={distinctYear.movie} key={distinctYear.year} />
        ))}
      </div>
    </div>
  );
};

export default BrowseMoviepage;
