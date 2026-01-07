import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { createMovie, getCategories, getStreaming } from "../../api";
import { MoviePreview } from "../../components/moviePreview";
import type { Category, Streaming } from "../../movieflix";
import { formatDate } from "../../utils/formatDate";
import {
  registerMovieSchema,
  type registerMovieInfoSchema,
} from "../../zodSchemas/registerMovieSchema";

export interface MoviePreviewInterface {
  title?: string;
  description?: string;
  releaseDate?: string;
  rating?: number;
  imageUrl?: string;
}

export const MovieRegisterPage = () => {
  const [categories, setCategories] = useState<Category[]>();
  const [streamings, setStreamings] = useState<Streaming[]>();
  const [selectedMovieCategories, setSelectedMovieCategories] = useState<
    Category[]
  >([]);
  const [selectedMovieStreamings, setSelectedMovieStreamings] = useState<
    Streaming[]
  >([])
  const { register, handleSubmit, setValue, formState: {errors} } = useForm<registerMovieInfoSchema>({
    resolver: zodResolver(registerMovieSchema),
  });
  const navigate = useNavigate();

  setValue("streamings", selectedMovieStreamings.map(s => s.id))
  setValue("categories", selectedMovieCategories.map(s => s.id))

  const [newMoviePreview, setNewMoviePreview] = useState<MoviePreviewInterface>(
    {
      title: "new movie",
      imageUrl: "https://placehold.co/240x360",
      description: "a New movie About Something",
      rating: 0.0,
      releaseDate: "2024-02-10",
    }
  );

  function addCategory(event: ChangeEvent<HTMLSelectElement>) {
    const index = Number(event.target.value);
    if (categories) {
      setSelectedMovieCategories([
        ...(selectedMovieCategories || []),
        { id: categories[index].id, name: categories[index].name },
      ]);
      categories.splice(index, 1);
    }
  }

  function addStreaming(event: ChangeEvent<HTMLSelectElement>) {
    const index = Number(event.target.value);
    if (streamings) {
      setSelectedMovieStreamings([
        ...(selectedMovieStreamings || []),
        {
          id: streamings[index].id,
          name: streamings[index].name,
          imageUrl: streamings[index].imageUrl,
        },
      ]);
      streamings.splice(index, 1);
    }
  }

  function removeSelectedCategory(index: number) {
    setCategories([...categories || [], {
      id: selectedMovieCategories[index].id,
      name: selectedMovieCategories[index].name
    }])    
    selectedMovieCategories.splice(index, 1) 
    
  }

  function removeSelectedStreaming(index: number) {
    setStreamings([...streamings || [], {
      id: selectedMovieStreamings[index].id,
      name: selectedMovieStreamings[index].name,
      imageUrl: selectedMovieStreamings[index].imageUrl
    }])
    
    selectedMovieStreamings.splice(index, 1)
  }

  function creationSucess() {
    navigate("/")    
  }

  function handlecreateNewMovie(data: registerMovieInfoSchema) {
    try {
      data.releaseDate = formatDate(data.releaseDate);      
      parseFloat(data.rating)
      createMovie(data)
      creationSucess()
    } catch (err) {

    }
  }

  useEffect(() => {
    if (newMoviePreview.imageUrl === "") {
      setNewMoviePreview({
        ...newMoviePreview,
        imageUrl: "https://placehold.co/240x360",
      });
    }
  }, [newMoviePreview.imageUrl]);

  useEffect(() => {
    const initCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result.data);
      } catch (err) {
        return "Falha ao buscar Categories";
      }
    };

    const initStreaming = async () => {
      try {
        const result = await getStreaming();
        setStreamings(result.data);
      } catch (err) {
        return "Falha ao buscar Categories";
      }
    };
    initCategories();
    initStreaming();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-8 mt-10">
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
            {...register("title")}
            onChange={(e) =>
              setNewMoviePreview({ ...newMoviePreview, title: e.target.value })
            }
            type="text"
            id="title"
            placeholder="insert title"
            className={twMerge("border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0", errors.title?.message && "border-red-600")}
          />
          {<div className="text-sm text-red-600">{errors.title?.message}</div>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="imageUrl" className="text-slate-200 text-[20px]">
            Image URL:
          </label>
          <input
            {...register("imageUrl")}
            type="text"
            id="imageUrl"
            onChange={(e) =>
              setNewMoviePreview({
                ...newMoviePreview,
                imageUrl: e.target.value,
              })
            }
            placeholder="insert image url"
            className={twMerge("border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0", errors.imageUrl?.message && "border-red-600")}
          />
          {<div className="text-sm text-red-600">{errors.imageUrl?.message}</div>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-slate-200 text-[20px]">
            Descrição:
          </label>
          <textarea
            {...register("description")}
            id="description"
            placeholder="Insert description"
            onChange={(e) =>
              setNewMoviePreview({
                ...newMoviePreview,
                description: e.target.value,
              })
            }
            className={twMerge("border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0 resize-y h-9 min-h-9 max-h-80", errors.description?.message && "border-red-600")}
          />
          {<div className="text-sm text-red-600">{errors.description?.message}</div>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="date" className="text-slate-200 text-[20px]">
            Release Date:
          </label>
          <input
            {...register("releaseDate")}
            type="date"
            id="date"
            onChange={(e) =>
              setNewMoviePreview({
                ...newMoviePreview,
                releaseDate: formatDate(e.target.value)
              })
            }
            className={twMerge("border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0", errors.releaseDate?.message && "border-red-600")}
          />
          {<div className="text-sm text-red-600">{errors.releaseDate?.message}</div>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="rating" className="text-slate-200 text-[20px]">
            Rating:
          </label>
          <input
            {...register("rating")}
            onChange={(e) =>
              setNewMoviePreview({
                ...newMoviePreview,
                rating: Number(e.target.value),
              })
            }
            type="number"
            max={10}
            step={0.1}
            id="rating"
            placeholder="insert rating"
            className={twMerge("border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0", errors.rating?.message && "border-red-600")}
          />
          {<div className="text-sm text-red-600">{errors.rating?.message}</div>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="categories" className="text-slate-200 text-[20px]">
            Streaming:
          </label>
          <select
            onChange={addStreaming}
            className={twMerge("border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0", errors.streamings?.message && "border-red-600")}
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
          {<div className="text-sm text-red-600">{errors.streamings?.message}</div>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="categories" className="text-slate-200 text-[20px]">
            Category:
          </label>
          <select
            onChange={addCategory}
            className={twMerge("border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0", errors.categories?.message && "border-red-600")}
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
          {<div className="text-sm text-red-600">{errors.categories?.message}</div>}
        </div>
      </form>
      <div className="flex justify-center items-end max-h-[50vh] relative">
        {/* {sucessCreateMovie && (<span className="text-white absolute top-2 animate-bounce bg-green-400 rounded-lg px-4 py-2">{sucessCreateMovie}</span>)} */}
        <button
          form="createMovie"
          className="w-full h-8 bg-slate-800 rounded-2xl text-slate-200 cursor-pointer"
        >
          Criar Filme
        </button>
      </div>
      <MoviePreview
        newMovie={newMoviePreview}
        category={selectedMovieCategories}
        streamings={selectedMovieStreamings}
        removeCategory={removeSelectedCategory}
        removeStreaming={removeSelectedStreaming}
      ></MoviePreview>
    </div>
  );
};
