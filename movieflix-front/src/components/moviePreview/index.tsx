import { twMerge } from "tailwind-merge";
import type { Category, Streaming } from "../../movieflix";
import type { MoviePreviewInterface } from "../../pages/movieRegisterPage";

interface MoviePreviewProps {
  newMovie: MoviePreviewInterface,
  category: Category[],
  streamings: Streaming[]
}


export const MoviePreview = ({newMovie, category, streamings}: MoviePreviewProps) => {
  const {title, description, imageUrl, rating, releaseDate} = newMovie
  
  return (
    <aside className="flex flex-col text-slate-200">
      <div className="relative w-fit">
        <img className="w-60" src={imageUrl} alt="" />
        <span
          className={twMerge("absolute right-4 bottom-4 rounded-full p-2 font-bold", "bg-red-600", rating && rating > 5 && "bg-orange-400", rating &&  rating > 7 && "bg-green-400")}
        >
          {rating === 10 ? rating : rating?.toFixed(1)}
        </span>
      </div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <span className="text-slate-400 text-lg">{releaseDate}</span>
      <p className="w-2/3">
        {description}
      </p>
      <div className="flex gap-4 mt-2">
        {streamings?.map((streaming) => {
          const { name, imageUrl } = streaming;
          return (
            <div
              key={name}
              className="text-white px-4 py-1 rounded-lg bg-slate-500 flex items-center gap-2"
            >
              <img className="w-8" src={imageUrl} alt="" />
              <p>{name}</p>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-2 flex-wrap">
        {category?.map((streaming) => {
          const { name } = streaming;
          return (
            <p
              className="text-white px-4 py-1 rounded-lg bg-slate-500"
              key={name}
            >
              {name}
            </p>
          );
        })}
      </div>
    </aside>
  );
};
