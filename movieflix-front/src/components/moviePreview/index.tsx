import { twMerge } from "tailwind-merge";
import type { Category, Streaming } from "../../movieflix";
import type { MoviePreviewInterface } from "../../pages/movieRegisterPage";
import { X } from "lucide-react";

interface MoviePreviewProps {
  newMovie: MoviePreviewInterface;
  category: Category[];
  streamings: Streaming[];
  removeCategory: (index: number) => void;
  removeStreaming: (index: number) => void;
}

export const MoviePreview = ({
  newMovie,
  category,
  streamings,
  removeCategory,
  removeStreaming
}: MoviePreviewProps) => {
  const { title, description, imageUrl, rating, releaseDate } = newMovie;

  return (
    <aside className="flex flex-col text-slate-200">
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
      <h2 className="text-2xl font-bold">{title}</h2>
      <span className="text-slate-400 text-lg">{releaseDate}</span>
      <p className="w-2/3">{description}</p>
      <div className="flex gap-4 mt-2">
        {streamings?.map((streaming, i) => {
          const { name, imageUrl } = streaming;
          return (
            <div
              key={name}
              className="text-white px-4 py-1 rounded-lg bg-slate-500 flex items-center gap-2 relative group"
            >
              <img className="w-8" src={imageUrl} alt="" />
              <p className="cursor-default">{name}</p>
              <X onClick={() => removeStreaming(i)} className="absolute right-0 top-2.25 w-4 hidden group-hover:block cursor-pointer"/>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-2 flex-wrap">
        {category?.map((streaming, i) => {
          const { name } = streaming;
          return (
            <div className="text-white px-4 py-1 rounded-lg bg-slate-500 relative group" key={name}>
              <p className="cursor-default">{name}</p>
              <X onClick={() => removeCategory(i)} className="absolute right-0 top-1.25 w-4 hidden group-hover:block cursor-pointer"/>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
