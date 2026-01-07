import { useEffect, useState } from "react";
import type { Movie } from "../../movieflix";
import { getMovies } from "../../api";
import { twMerge } from "tailwind-merge";

export const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    const initMovies = async () => {
      try {
        const result = await getMovies();
        setMovies(result.data);
      } catch (err) {
        return "Falha ao buscar filmes";
      }
    };
    initMovies();
  }, []);

  return (
    <ul className="mt-10 flex gap-10 flex-wrap">
      {!movies ? (
        <div className="w-full min-h-full flex items-center justify-center text-4xl text-white">
          Carregando...
        </div>
      ) : (
        <>
          {movies.map((movie) => {
            const { title, rating, imageUrl, id } = movie;
            return (
              <li className="w-60 text-white relative flex flex-col" key={id}>
                <div className="relative w-fit">
                  <img className="w-60" src={imageUrl} alt="" />
                  <span
                    className={twMerge(
                      "absolute right-4 bottom-4 rounded-full p-2 font-bold",
                      "bg-red-600",
                      rating && rating > 5 && "bg-orange-400",
                      rating && rating > 7 && "bg-green-400"
                    )}
                  >
                    {rating === 10 ? rating : rating?.toFixed(1)}
                  </span>
                </div>
                <h2 className="text-2xl">{title}</h2>
              </li>
            );
          })}
        </>
      )}
    </ul>
  );
};
