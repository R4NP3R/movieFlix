import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { MovieList } from "../../components/movieList";
import { MoviePreview } from "../../components/moviePreview";
import { NewMovieForm } from "../../components/newMovieForm";

export interface MoviePreviewInterface {
  title?: string;
  description?: string;
  releaseDate?: string;
  rating?: number;
  imageUrl?: string;
}

export const MovieManagerPage = () => {
  const [movieManageType, setMovieManageType] = useState<"register" | "delete">(
    "register"
  );

  
  return (
    <div>
      <div className="w-full flex justify-center mt-10 gap-4">
        <button
          onClick={() => setMovieManageType("register")}
          className={twMerge(
            "bg-slate-800 cursor-pointer rounded text-lg px-6 py-1 font-semibold text-white",
            movieManageType === "register" && "bg-slate-500"
          )}
        >
          Register
        </button>
        <button
          onClick={() => setMovieManageType("delete")}
          className={twMerge(
            "bg-slate-800 cursor-pointer rounded text-lg px-6 py-1 font-semibold text-white",
            movieManageType === "delete" && "bg-slate-500"
          )}
        >
          Delete
        </button>
      </div>
      {movieManageType === "register" && (
        <div className="grid grid-cols-3 gap-8 ">
          <NewMovieForm />
          <div className="flex justify-center items-end max-h-[50vh] relative">
            {/* {sucessCreateMovie && (<span className="text-white absolute top-2 animate-bounce bg-green-400 rounded-lg px-4 py-2">{sucessCreateMovie}</span>)} */}
            <button
              form="createMovie"
              className="w-full h-8 bg-slate-800 rounded-2xl text-slate-200 cursor-pointer"
            >
              Create Movie
            </button>
          </div>
          <MoviePreview />
        </div>
      )}
      {movieManageType === "delete" && (
        <>
        <MovieList isDelete={true}/>
        </>
      )}
    </div>
  );
};
