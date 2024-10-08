import { z } from "zod";

// Helper to count words in a string
const maxWords = (limit: number) =>
  z.string().refine((value) => value.split(/\s+/).length <= limit, {
    message: `Description must have no more than ${limit} words`,
  });

const detailFormSchema = z.object({
  moviename: z.string().min(1, "Movie name must be at least 1 character"),

  year: z
    .number()
    .min(1900, "Year must be a valid year")
    .max(new Date().getFullYear(), "Year cannot be in the future"),

  description: maxWords(100).optional(), // Custom validation for max 100 words

  poster: z
    .instanceof(File) // Validate it's a file
    .optional() // Make the field optional
    .refine((file) => file === undefined || file.size <= 5 * 1024 * 1024, {
      message: "Poster must be less than 5MB",
    })
    .refine(
      (file) =>
        file === undefined || ["image/jpeg", "image/png"].includes(file.type),
      {
        message: "Poster must be a JPG or PNG image",
      },
    ),
  //   poster: z.instanceof(FileList).optional(),
});

export default detailFormSchema;
