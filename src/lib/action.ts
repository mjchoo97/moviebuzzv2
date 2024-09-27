"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "./client";

import { slugify } from "./utils";
import { revalidatePath } from "next/cache";

type Movie = {
  moviename: string;
  year: number;
  score: number;
  description?: string;
  poster?: string;
};

type Rating = {
  rating: number;
  movieslug: string;
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
    const rateres = await addRating({ rating: score, movieslug: movieslug });
    return { success: true, error: false, movieslug: movieslug };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const getMovie = async (movieslug: string) => {
  const { userId } = auth();

  try {
    const moviedetail = await prisma.movie.findFirst({
      where: {
        movieslug: movieslug,
      },
    });

    if (!moviedetail) {
      throw new Error("Unable to find current movie in database.");
    }

    let userRating;
    if (userId) {
      userRating = await prisma.rating.findFirst({
        where: {
          userId: userId,
          movieId: moviedetail.id,
        },
      });
    }

    return {
      moviename: moviedetail.moviename,
      description: moviedetail.description,
      year: moviedetail.year,
      poster: moviedetail.poster,
      totalRating: moviedetail.score,
      userRating: userRating?.rating,
    };
  } catch (err) {
    console.log(err);
    return {
      moviename: "",
      description: "",
      year: 0,
      poster: "",
      totalRating: 0,
      userRating: 0,
    };
  }
};

export const addRating = async (rate: Rating) => {
  const { rating, movieslug } = rate;

  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized user!");
  }

  try {
    const moviedetilslug = await prisma.movie.findFirst({
      where: {
        movieslug: movieslug,
      },
    });

    if (!moviedetilslug) {
      throw new Error("Could not find the following movie in database.");
    }

    const movieId = moviedetilslug.id;

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

    const totalRating = await prisma.rating.aggregate({
      where: {
        movieId: movieId, // Aggregate only ratings for this movie
      },
      _avg: {
        rating: true,
      },
    });

    if (!totalRating || typeof totalRating._avg.rating !== "number") {
      throw new Error("Could not calculate the score");
    }

    const updateScore = await prisma.movie.update({
      where: {
        id: movieId,
      },
      data: {
        score: totalRating._avg.rating,
      },
    });

    console.log(updateScore);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const editRating = async (rate: Rating) => {
  const { userId } = auth();

  const { rating, movieslug } = rate;

  if (!userId) {
    throw new Error("Unauthorized user!");
  }

  try {
    // Find the Movie ID first based on the slug name
    const findId = await prisma.movie.findFirst({
      where: {
        movieslug: movieslug,
      },
    });

    if (!findId) {
      throw new Error("Could not find the ID for this movie");
    }
    // Assign ID once found it
    const movieId = findId.id;
    console.log(movieId);

    // Find the ID of the rating record
    const ratingRecord = await prisma.rating.findFirst({
      where: {
        userId: userId,
        movieId: movieId,
      },
    });

    // If no record is found, throw an error
    if (!ratingRecord) {
      throw new Error("Rating not found!");
    }

    //Perform update operation
    const res = await prisma.rating.update({
      where: {
        userId: userId,
        movieId: movieId,
        id: ratingRecord.id,
      },
      data: {
        rating: rating,
      },
    });
    console.log("Succesfully update Id");

    const totalRating = await prisma.rating.aggregate({
      where: {
        movieId: movieId, // Aggregate only ratings for this movie
      },
      _avg: {
        rating: true,
      },
    });

    if (!totalRating || typeof totalRating._avg.rating !== "number") {
      throw new Error("Could not calculate the score");
    }

    const updateScore = await prisma.movie.update({
      where: {
        id: movieId,
      },
      data: {
        score: totalRating._avg.rating,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const getDistinctMovieByYear = async () => {
  try {
    const distinctYears = await prisma.movie.findMany({
      select: {
        year: true,
      },
      distinct: ["year"],
    });

    return distinctYears.map((movie) => movie.year);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getMovieByYear = async (year: number) => {
  try {
    const res = await prisma.movie.findMany({
      where: {
        year: year,
      },
    });

    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
