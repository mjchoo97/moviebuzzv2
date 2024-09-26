import { z } from "zod";

// Helper to count words in a string
const maxWords = (limit: number) =>
  z.string().refine((value) => value.split(/\s+/).length <= limit, {
    message: `Description must have no more than ${limit} words`,
  });

const editFormSchema = z.object({
  score: z.number().min(0).max(10).multipleOf(0.01), // Allows up to 2 decimal places
});

export default editFormSchema;
