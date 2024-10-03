"use client";

import SearchResult from "@/components/searchmovie/SearchResult";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const movie = searchParams.get("movie");
  const page = searchParams.get("page");
  console.log(page);

  if (!movie) {
    return <div>Empty</div>;
  }

  return (
    <div className="h-full min-h-screen space-y-5 py-3">
      <SearchResult movie={movie} page={Number(page)} />
    </div>
  );
};

export default SearchPage;
