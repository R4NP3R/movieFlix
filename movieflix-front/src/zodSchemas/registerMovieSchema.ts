import z from "zod";

export const registerMovieSchema = z.object({
  title: z.string().nonempty("Insert movie title"),
  description: z.string().nonempty("Insert movie description"),
  releaseDate: z.string().nonempty("Insert movie release Date"),
  rating: z.string().nonempty("Insert the movie rating"),
  imageUrl: z.string().nonempty("Insert movie image url"),
  categories: z.array(z.number()).nonempty("Select at least one category"),
  streamings: z.array(z.number()).nonempty("Select at least one streaming")
});


export type registerMovieInfoSchema = z.infer<typeof registerMovieSchema>;
