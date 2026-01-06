import axios from "axios";
import type { Category, Movie, Streaming } from "./movieflix";
import type { registerMovieInfoSchema } from "./zodSchemas/registerMovieSchema";

const BASE_URL = "http://localhost:8080/movieflix";

// GET METHODS

export const getMovies = async () => {
  const data = await axios.get<Movie[]>(`${BASE_URL}/movie`);
  return data;
};

export const getCategories = async () => {
  const data = await axios.get<Category[]>(`${BASE_URL}/category`);
  return data;
};

export const getStreaming = async () => {
  const data = await axios.get<Streaming[]>(`${BASE_URL}/streaming`);
  return data;
};

// POST METHODS

export const createMovie = async (newmovie: registerMovieInfoSchema) => {
  try {
    const data = await axios.post<registerMovieInfoSchema>(`${BASE_URL}/movie`, newmovie)
    return data
  } catch (err) {
    console.log(err)
    return err
  }
}
