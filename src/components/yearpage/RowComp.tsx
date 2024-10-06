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

  let finalscore = "-";
  if (!userScore || userScore.length == 0) {
    finalscore = "-";
  } else {
    finalscore = Number(userScore[0].rating).toFixed(1);
  }

  return (
    <TableRow className="w-full cursor-pointer text-xl" onClick={onClick}>
      <TableCell className="text-center font-semibold">{rank + 1}</TableCell>
      <TableCell>{moviename}</TableCell>
      <TableCell className="text-center text-amber-300">
        {score.toFixed(1)}
      </TableCell>
      <TableCell className="text-center">{finalscore}</TableCell>
    </TableRow>
  );
};

export default RowComp;
