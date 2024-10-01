"use server";

import { resolve } from "node:path/win32";
import prisma from "./client";
import { getCurrentUser } from "./session";

import { slugify } from "./utils";
import { revalidatePath } from "next/cache";
import { getAccountByUserId } from "@/data-access/accounts";

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

export const auth = async () => {
  const user = await getCurrentUser();

  if (!user || typeof user == "undefined") {
    return { userId: null };
  }

  return {
    userId: user.id,
  };
};

export const addMovie = async (movie: Movie) => {
  "use server";
  const { moviename, year, score, description, poster } = movie;

  const movieslug = slugify(moviename);

  const { userId } = await auth();
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

    const rateres = await addRating({ rating: score, movieslug: movieslug });
    return { success: true, error: false, movieslug: movieslug };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const getMovie = async (movieslug: string) => {
  const { userId } = await auth();
  // if (!userId) {
  //   throw new Error("Unauthorized user!");
  // }

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
      movieslug: moviedetail.movieslug,
      totalRating: moviedetail.score,
      userRating: userRating?.rating,
      createdUserId: moviedetail.createdUserId,
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
      movieslug: "",
    };
  }
};

export const addRating = async (rate: Rating) => {
  const { rating, movieslug } = rate;

  const { userId } = await auth();
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

    await updateMovieOverallScore(movieId);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const editRating = async (rate: Rating) => {
  const { userId } = await auth();

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
        updatedAt: new Date(),
      },
    });
    console.log("Succesfully update Id");

    await updateMovieOverallScore(movieId);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateMovieOverallScore = async (movieId: string) => {
  try {
    const ratingCount = await prisma.rating.count({
      where: {
        movieId: movieId,
      },
    });

    if (ratingCount == 0) {
      await prisma.movie.update({
        where: {
          id: movieId,
        },
        data: {
          score: 0,
          updatedAt: new Date(),
        },
      });
      return { success: true, error: false };
    }

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

    await prisma.movie.update({
      where: {
        id: movieId,
      },
      data: {
        score: totalRating._avg.rating,
        updatedAt: new Date(),
      },
    });
    return { success: true, error: false };
  } catch (e) {
    console.log(e);
    return { success: false, error: true };
  }
};

export const getTopDistinctMovieByYear = async () => {
  try {
    const distinctYears = await prisma.movie.findMany({
      select: {
        year: true,
      },
      distinct: ["year"],
      orderBy: {
        year: "desc", // Sort the years in descending order
      },
      take: 5, // Limit the results to 5
    });

    return distinctYears.map((movie) => movie.year);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getDistinctMovieByYear = async () => {
  try {
    const distinctYears = await prisma.movie.findMany({
      select: {
        year: true,
      },
      distinct: ["year"],
      orderBy: {
        year: "desc", // Sort the years in descending order
      },
    });

    // Create an array to hold the results
    const results = [];

    for (const { year } of distinctYears) {
      const movieCount = await prisma.movie.count({
        where: {
          year: year,
        },
      });
      // Fetch a random movie for each year
      const randomMovie = await prisma.movie.findFirst({
        where: {
          year: year,
        },
        orderBy: {
          // Using a random order to fetch a random movie
          id: "asc", // Using id as a placeholder for random selection
        },
        take: 1,
        skip: Math.floor(Math.random() * (movieCount - 1 + 1)),
      });

      if (!randomMovie) {
        throw new Error("Could not find the movie for the year");
      }

      // Add the year and the random movie to the results array
      results.push({
        year: year,
        movie: randomMovie,
      });
    }

    return results;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getMovieByYear = async (year: number) => {
  try {
    const res = await prisma.movie.findMany({
      where: {
        year: year,
      },
      include: {
        rating: true, // Include the related ratings for each movie
      },
    });

    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserMovieRating = async (movieslug: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized user!");
  }
  try {
    const movieinfo = await prisma.movie.findFirst({
      where: {
        movieslug: movieslug,
      },
    });

    if (!movieinfo) {
      throw new Error("Could not find the movie in database.");
    }

    const res = await prisma.rating.findFirst({
      where: {
        userId: userId,
        movieId: movieinfo.id,
      },
    });

    return res?.rating;
  } catch (err) {
    console.log(err);
  }
};

export const getOtherUserRating = async (movieslug: string) => {
  try {
    const movieinfo = await prisma.movie.findFirst({
      where: {
        movieslug: movieslug,
      },
    });

    if (!movieinfo) {
      throw new Error("Could not find the movie in database.");
    }

    const res = await prisma.rating.findMany({
      where: {
        movieId: movieinfo.id,
      },
      include: {
        user: {
          include: {
            account: true, // Include the related Account schema of the User
          },
        },
      },
      take: 6, // Limit the results to a maximum of 5 ratings
    });

    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getTotalMoieAndUser = async () => {
  try {
    const totalMovie = await prisma.movie.count();
    const totalUser = await prisma.user.count();

    return {
      totalMovie,
      totalUser,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getRecommendedMovie = async () => {
  try {
    const movieTotalCount = await prisma.movie.count();

    const movieToTake = movieTotalCount > 6 ? 6 : movieTotalCount;

    const randomMovies = await prisma.movie.findMany({
      orderBy: {
        // Use random sorting to get random records
        id: "asc",
      },
      take: movieToTake,
      skip: Math.floor(Math.random() * (movieTotalCount - movieToTake + 1)),
    });

    if (randomMovies.length === 0) {
      throw new Error("No movies found in the database.");
    }

    return randomMovies;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteUserRating = async (movieslug: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized user!");
  }
  try {
    const findMovieId = await prisma.movie.findFirst({
      where: {
        movieslug,
      },
    });

    if (!findMovieId) {
      throw new Error("Could not find the following movie in server.");
    }

    await prisma.rating.deleteMany({
      where: {
        movieId: findMovieId.id,
        userId: userId,
      },
    });

    return await updateMovieOverallScore(findMovieId.id);
    // return { success: true, error: false };
  } catch (e) {
    console.log(e);
    return { success: false, error: true };
  }
};

export const deleteMovieProfile = async (movieslug: string) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized user!");
    }

    const userRole = await getAccountByUserId(userId);

    if (userRole?.user.role !== "admin") {
      throw new Error("Current user does not has admin priveleged!");
    }

    await prisma.movie.deleteMany({
      where: {
        movieslug,
      },
    });

    revalidatePath("/");

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
