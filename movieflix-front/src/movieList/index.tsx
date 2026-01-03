import { useEffect, useState } from "react";
import type { Movie } from "../movieflix";
import { getMovies } from "../api";

export const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>();
  const [serverError, setServerError] = useState<String>();

  useEffect(() => {
    const initMovies = async () => {
      try {
        const result = await getMovies();
        console.log(result.data);
        setMovies(result.data);
      } catch (err) {
        return "Falha ao buscar filmes";
      }
    };
    initMovies();
  }, []);

  return (
    <ul className="mt-10 flex gap-10">
      {!movies ? (
        <div className="w-full min-h-dvh flex items-center justify-center text-4xl text-white">
          Carregando...
        </div>
      ) : (
        <>
          {movies.map((movie) => {
            const { title, rating, imageUrl } = movie;
            return (
              <li className="w-60 text-white relative" key={title}>
                <img src={imageUrl} alt="" />
                <span
                  className={
                    rating >= 5
                      ? `absolute right-4 bottom-12 rounded-full p-2 bg-orange-400 font-bold`
                      : `absolute right-4 bottom-12 rounded-full p-2 bg-red-500 font-bold`
                  }
                >
                  {rating}
                </span>
                <h2 className="text-2xl">{title}</h2>
              </li>
            );
          })}
        </>
      )}
    </ul>
  );
};
