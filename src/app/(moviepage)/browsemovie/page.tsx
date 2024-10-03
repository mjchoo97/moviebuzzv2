import React from "react";
import { getDistinctMovieByYear } from "@/lib/action";
import { FocusMovie } from "@/components/ui/focus-movie";

const BrowseMoviepage = async () => {
  const distictYears = await getDistinctMovieByYear();

  if (!distictYears) {
    return <div>No Movie yet</div>;
  }

  return (
    <div className="flex min-h-screen flex-col gap-5">
      <div className="py-5 text-3xl text-neutral-400 shadow-slate-950 text-shadow">
        Browse all our movies
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-8 pb-5 md:grid-cols-3">
        {distictYears.map((distinctYear) => (
          <FocusMovie movie={distinctYear.movie} key={distinctYear.year} />
        ))}
      </div>
    </div>
  );
};

export default BrowseMoviepage;
