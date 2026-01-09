import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { createMovie } from "../../api";
import { newMovieContext } from "../../context/newMovie";
import { formatDate } from "../../utils/formatDate";
import {
  registerMovieSchema,
  type registerMovieInfoSchema,
} from "../../zodSchemas/registerMovieSchema";
import type { Category, Streaming } from "../../movieflix";

export const NewMovieForm = () => {
  const {
    categories,
    streamings,
    newMoviePreview,
    setNewMoviePreview,
    addStreaming,
    addCategory,
    selectedMovieCategories,
    selectedMovieStreamings,
  } = useContext(newMovieContext);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<registerMovieInfoSchema>({
    resolver: zodResolver(registerMovieSchema),
  });

  async function handlecreateNewMovie(data: registerMovieInfoSchema) {
    data.releaseDate = formatDate(data.releaseDate);
    parseFloat(data.rating);
    const result = await createMovie(data);
    if (typeof result === "object") {
      console.log("message erro:", result.data);
    } else {
      // creationSucess();
    }
  }

  function formFieldSync(field: "categories" | "streamings", arrayValues: Streaming[] | Category[]) {
    setValue(
      field,
      arrayValues.map((c) => c.id)
    );
    if (arrayValues.length > 0) {
      clearErrors(field);
    }
  }

  useEffect(() => {
    formFieldSync("categories", selectedMovieCategories)
    
  }, [selectedMovieCategories]);

  useEffect(() => {
    formFieldSync("streamings", selectedMovieStreamings)
  }, [selectedMovieStreamings]);

  return (
    <form
      onSubmit={handleSubmit(handlecreateNewMovie)}
      className="flex flex-col gap-4 w-full col-span-1 bg-slate-800 p-8 rounded-lg"
      id="createMovie"
    >
      <h1 className="text-4xl font-semibold text-slate-200 mb-4 text-center">
        Create Movie
      </h1>
      <div className="flex flex-col">
        <label htmlFor="title" className="text-slate-200 text-[20px]">
          Title:
        </label>
        <input
          autoFocus
          {...register("title", {
            onChange: (e) =>
              setNewMoviePreview({
                ...newMoviePreview,
                title: e.target.value,
              }),
          })}
          type="text"
          id="title"
          placeholder="insert title"
          className={twMerge(
            "border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0",
            errors.title?.message && "border-red-600"
          )}
        />
        {<div className="text-sm text-red-600">{errors.title?.message}</div>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="imageUrl" className="text-slate-200 text-[20px]">
          Image URL:
        </label>
        <input
          {...register("imageUrl", {
            onChange: (e) =>
              setNewMoviePreview({
                ...newMoviePreview,
                imageUrl: e.target.value,
              }),
          })}
          type="text"
          id="imageUrl"
          placeholder="insert image url"
          className={twMerge(
            "border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0",
            errors.imageUrl?.message && "border-red-600"
          )}
        />
        {<div className="text-sm text-red-600">{errors.imageUrl?.message}</div>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="text-slate-200 text-[20px]">
          Descrição:
        </label>
        <textarea
          {...register("description", {
            onChange: (e) =>
              setNewMoviePreview({
                ...newMoviePreview,
                description: e.target.value,
              }),
          })}
          id="description"
          placeholder="Insert description"
          className={twMerge(
            "border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0 resize-y h-9 min-h-9 max-h-80",
            errors.description?.message && "border-red-600"
          )}
        />
        {
          <div className="text-sm text-red-600">
            {errors.description?.message}
          </div>
        }
      </div>
      <div className="flex flex-col">
        <label htmlFor="date" className="text-slate-200 text-[20px]">
          Release Date:
        </label>
        <input
          {...register("releaseDate", {
            onChange: (e) =>
              setNewMoviePreview({
                ...newMoviePreview,
                releaseDate: formatDate(e.target.value),
              }),
          })}
          type="date"
          id="date"
          className={twMerge(
            "border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0",
            errors.releaseDate?.message && "border-red-600"
          )}
        />
        {
          <div className="text-sm text-red-600">
            {errors.releaseDate?.message}
          </div>
        }
      </div>
      <div className="flex flex-col">
        <label htmlFor="rating" className="text-slate-200 text-[20px]">
          Rating:
        </label>
        <input
          {...register("rating", {
            onChange: (e) =>
              setNewMoviePreview({
                ...newMoviePreview,
                rating: Number(e.target.value),
              }),
          })}
          type="number"
          max={10}
          step={0.1}
          id="rating"
          placeholder="insert rating"
          className={twMerge(
            "border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0",
            errors.rating?.message && "border-red-600"
          )}
        />
        {<div className="text-sm text-red-600">{errors.rating?.message}</div>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="categories" className="text-slate-200 text-[20px]">
          Streaming:
        </label>
        <select
          onChange={(e) => addStreaming(e)}
          className={twMerge(
            "border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0",
            errors.streamings?.message && "border-red-600"
          )}
          name="categories"
          id="categories"
        >
          {streamings?.length != 0 ? (
            <option>Select a Streaming</option>
          ) : (
            <option>No more Streaming to select</option>
          )}
          {streamings?.map((streaming, i) => {
            const { id, name } = streaming;
            if (name != selectedMovieStreamings[id]?.name) {
              return (
                <option key={id} value={i}>
                  {name}
                </option>
              );
            }
          })}
        </select>
        {
          <div className="text-sm text-red-600">
            {errors.streamings?.message}
          </div>
        }
      </div>
      <div className="flex flex-col">
        <label htmlFor="categories" className="text-slate-200 text-[20px]">
          Category:
        </label>
        <select
          onChange={addCategory}
          className={twMerge(
            "border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0",
            errors.categories?.message && "border-red-600"
          )}
          name="categories"
          id="categories"
        >
          {categories?.length != 0 ? (
            <option>Select a Category</option>
          ) : (
            <option>No more Category to select</option>
          )}
          {categories?.map((category, i) => {
            const { id, name } = category;
            if (name != selectedMovieCategories[id]?.name) {
              return (
                <option key={id} value={i} className="relative ">
                  {name}
                </option>
              );
            }
          })}
        </select>
        {
          <div className="text-sm text-red-600">
            {errors.categories?.message}
          </div>
        }
      </div>
    </form>
  );
};
