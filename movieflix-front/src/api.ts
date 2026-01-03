import axios from "axios";
import type { Movie } from "./movieflix";

const BASE_URL = "http://localhost:8080/movieflix";

export const getMovies = async () => {
  const data = await axios.get<Movie[]>(`${BASE_URL}/movie`);
  return data;
};
