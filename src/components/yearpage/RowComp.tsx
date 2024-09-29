import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { auth } from "@/lib/action";
import { getCurrentUser } from "@/lib/session";

async function HeaderActions() {}

const RowComp = ({
  movie,
  rank,
  user,
  onClick,
}: {
  movie: Movie;
  rank: number;
  user: User;
  onClick: () => void;
}) => {
  const { moviename, movieslug, score, rating, ...movieinfo } = movie;
  const { userId } = user;

  let userScore = undefined;
  if (userId) {
    userScore = rating?.filter((rating) => rating.userId === userId);
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
