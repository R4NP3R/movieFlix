import { useEffect, useState } from "react";
import type { Movie } from "../../movieflix";
import { deleteMovie, getMovies } from "../../api";
import { twMerge } from "tailwind-merge";
import { Loader, X } from "lucide-react";

type Params = {
  isDelete: boolean;
};

export const MovieList = ({ isDelete }: Params) => {
  const [movies, setMovies] = useState<Movie[]>();
  const [movieIndex, setMovieIndex] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const initMovies = async () => {
      const result = await getMovies();
      if (typeof result === "string") {
        return console.log(result);
      } else if (Array.isArray(result?.data)) {
        setMovies(result?.data);
      }
    };
    initMovies();
  }, []);

  function openModal(movieIndex: number) {
    setMovieIndex(movieIndex);
    setDeleteModal(true);
  }

  function closeModal() {
    setDeleteModal(false);
  }

  function handleDeleteMovie() {
    if (movies) {
      deleteMovie(movies[movieIndex].id);
      setMovies(movies.filter((_, i) => i !== movieIndex));
      closeModal();
    }
  }

  return (
    <>
      <ul className="mt-10 flex gap-10 flex-wrap">
        {!movies ? (
          <div className="w-full min-h-full flex items-center justify-center text-4xl text-white">
            <Loader width={40} height={40} className="animate-spin"/>
          </div>
        ) : (
          <>
            {movies.map((movie, i) => {
              const { title, rating, imageUrl, id } = movie;
              return (
                <li
                  className="w-60 text-white relative flex flex-col group"
                  key={id}
                >
                  <div className="relative w-fit">
                    {isDelete && (
                      <button
                        onClick={() => openModal(i)}
                        className="absolute top-2 right-2 rounded-full bg-red-500 cursor-pointer hidden group-hover:block"
                      >
                        <X />
                      </button>
                    )}
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
      {deleteModal && movies && (
        <div className="absolute w-full h-full top-0 left-0 bg-black z-50 flex justify-center items-center bg-opacity-80">
          <div className="bg-slate-600 w-1/5 h-1/5 flex items-center flex-col gap-2 p-4 relative">
            <p className="text-lg font-semibold text-white">
              Certeza que deseja deletar?
            </p>
            <p className="text-lg font-semibold text-white text-center">
              {movies[movieIndex].title}
            </p>
            <button
              onClick={closeModal}
              className="absolute bottom-4 left-20 p-2 bg-red-500 text-white cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleDeleteMovie}
              className="absolute bottom-4 right-20 px-4 py-2 bg-green-400 text-white cursor-pointer"
            >
              Ok
            </button>
          </div>
        </div>
      )}
      {movies && movies.length === 0 && (
        <div className="w-full min-h-full flex items-center justify-center text-4xl text-white">
          <span>There are no movies listed</span>
        </div>
      )}
    </>
  );
};
