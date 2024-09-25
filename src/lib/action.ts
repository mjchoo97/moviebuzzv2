"use server";
import prisma from "./client";

type Movie = {
  moviename: string;
  year: number;
  score: number;
  description?: string;
  poster?: File;
};

export const addMovie = async (movie: Movie) => {
  const { moviename, year, score, description, poster } = movie;
  try {
    const res = await prisma.movie.create({
      data: {
        moviename: moviename,
        year: year,
        description: description,
        score: score,
      },
    });
    console.log(res);
    return { status: true };
  } catch (err) {
    console.log(err);
    return { status: false };
  }
};
