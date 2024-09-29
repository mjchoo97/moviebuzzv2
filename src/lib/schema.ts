type Movie = {
  score: number;
  moviename: string;
  movieslug: string;
  year: number;
  description: string | null;
  poster: string | null;
  id: string;
  createdAt: Date;
  createdUserId: string;
  rating?: Rating[];
};

type Rating = {
  id: string;
  movieId: string;
  rating: number;
  userId: string;
  createdAt: Date;
};

type User = {
  userId: string | null;
};
