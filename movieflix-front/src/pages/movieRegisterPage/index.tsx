import { MoviePreview } from "../../components/moviePreview";
import { NewMovieForm } from "../../components/newMovieForm";

export interface MoviePreviewInterface {
  title?: string;
  description?: string;
  releaseDate?: string;
  rating?: number;
  imageUrl?: string;
}

export const MovieRegisterPage = () => {
  return (
    <div className="grid grid-cols-3 gap-8 mt-10">
      <NewMovieForm />
      <div className="flex justify-center items-end max-h-[50vh] relative">
        {/* {sucessCreateMovie && (<span className="text-white absolute top-2 animate-bounce bg-green-400 rounded-lg px-4 py-2">{sucessCreateMovie}</span>)} */}
        <button
          form="createMovie"
          className="w-full h-8 bg-slate-800 rounded-2xl text-slate-200 cursor-pointer"
        >
          Criar Filme
        </button>
      </div>
      <MoviePreview></MoviePreview>
    </div>
  );
};
