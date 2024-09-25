"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "./client";

import { slugify } from "./utils";

type Movie = {
  moviename: string;
  year: number;
  score: number;
  description?: string;
  poster?: string;
};

type Rating = {
  rating: number;
  movieId: string;
};

export const addMovie = async (movie: Movie) => {
  "use server";
  const { moviename, year, score, description, poster } = movie;

  const { userId } = auth();
  const movieslug = slugify(moviename);

  if (!userId) {
    throw new Error("Unauthorized user!");
  }

  try {
    const res = await prisma.movie.create({
      data: {
        moviename: moviename,
        movieslug: movieslug,
        year: year,
        description: description,
        score: score,
        createdUserId: userId,
        poster: poster,
      },
    });
    console.log(res);
    const rateres = await addRating({ rating: score, movieId: res.id });
    return { success: true, error: false, movieslug: movieslug };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const addRating = async (rate: Rating) => {
  const { rating, movieId } = rate;

  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized user!");
  }

  try {
    const res = await prisma.rating.create({
      data: {
        userId: userId,
        rating: rating,
        movieId: movieId,
      },
      include: {
        movie: true,
      },
    });

    console.log(res);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const getMovie = async (movieslug: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized user!");
  }

  try {
    const moviedetail = await prisma.movie.findFirst({
      where: {
        movieslug: movieslug,
      },
    });

    console.log(moviedetail);

    const userRating = await prisma.rating.findFirst({
      where: {
        userId: userId,
      },
    });

    console.log(userRating);

    const totalRating = await prisma.rating.aggregate({
      where: {
        movieId: moviedetail?.id, // Aggregate only ratings for this movie
      },
      _avg: {
        rating: true,
      },
    });

    return {
      ...moviedetail,
      totalRating: totalRating._avg.rating,
      userRating: userRating?.rating,
    };
  } catch (err) {
    console.log(err);
    return { movie: null, totalRating: 0 };
  }
};
