import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { useRouter } from "next/navigation";
import { getUserMovieRating } from "@/lib/action";

import { useUser } from "@clerk/nextjs";

const RowComp = ({
  movie,
  rank,
  onClick,
}: {
  movie: Movie;
  rank: number;
  onClick: () => void;
}) => {
  const { moviename, movieslug, score, rating, ...movieinfo } = movie;

  //   const userRating = await getUserMovieRating(movieslug);
  const { isSignedIn, user, isLoaded } = useUser();

  let userScore = undefined;
  if (user) {
    userScore = rating?.filter((rating) => rating.userId === user.id);
  }

  let finalscore = undefined;
  if (!userScore || typeof userScore === "undefined") {
    finalscore = "-";
  } else {
    finalscore = userScore[0].rating;
  }

  return (
    <TableRow className="w-full text-xl cursor-pointer" onClick={onClick}>
      <TableCell className="font-semibold text-center">{rank + 1}</TableCell>
      <TableCell>{moviename}</TableCell>
      <TableCell className="text-center text-amber-300">
        {score.toFixed(2)}
      </TableCell>
      <TableCell className="text-center">{finalscore}</TableCell>
    </TableRow>
  );
};

export default RowComp;
