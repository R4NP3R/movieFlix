import axios from "axios";
import type { Category, Movie, Streaming } from "./movieflix";
import type { registerMovieInfoSchema } from "./zodSchemas/registerMovieSchema";
import type { registerStreamingInfoSchema } from "./zodSchemas/registerStreamingSchema";

const BASE_URL = "http://localhost:8080/movieflix";

// GET METHODS

export const getMovies = async () => {
  try {
    const data = await axios.get<Movie[]>(`${BASE_URL}/movie`);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // console.log("error", err.response)
    } else {
      console.log("unexpected error", err)
      return "unexpected error" + err
    }
  }
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
    if(axios.isAxiosError(err)) {
      return err.response
    }
  }
}

export const createStreaming = async (newstreaming: registerStreamingInfoSchema) => {
  try {
    const data = await axios.post<registerMovieInfoSchema>(`${BASE_URL}/streaming`, newstreaming)
    return data
  } catch (err) {
    if(axios.isAxiosError(err)) {
      return err.response
    }
  }

}


// DELETE METHODS
export const deleteMovie = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/movie/${id}`);
    return response
  } catch (err) {
    if(axios.isAxiosError(err)) {
      return err.response
    } else {
      return "Unexpected error: " + err
    }

  }
}