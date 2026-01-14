import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import {
  registerStreamingSchema,
  type registerStreamingInfoSchema,
} from "../../zodSchemas/registerStreamingSchema";
import { createStreaming } from "../../api";

type StreamingPreview = {
  name: string;
  imageUrl: string;
};

export const StreamingManagerPage = () => {
  const [newStreamingPreview, setNewStreamingPreview] =
    useState<StreamingPreview>({
      name: "New Category",
      imageUrl: "https://placehold.co/32",
    });
  const [createStreamingSucess, setCreateSucess] = useState<string | null>(null);
  const [createStreamingError, setCreateError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<registerStreamingInfoSchema>({
    resolver: zodResolver(registerStreamingSchema),
  });

  useEffect(() => {
    if (newStreamingPreview.imageUrl === "") {
      setNewStreamingPreview({
        ...newStreamingPreview,
        imageUrl: "https://placehold.co/32",
      });
    }
  }, [newStreamingPreview.imageUrl]);

  async function handleCreateStreaming(data: registerStreamingInfoSchema) {
    const result = await createStreaming(data);

    if (result?.status === 400) {
      setCreateError(result.data);

      setTimeout(() => {
        (setCreateError(null))
      }, 3000)
    }

    if (result?.status === 201) {
      setNewStreamingPreview({...newStreamingPreview, name: "New Category"})
      setCreateSucess("Streaming created!");
      reset()
      setTimeout(() => {
        (setCreateSucess(null))
      }, 3000)
    }
  }

  return (
    <div className="grid grid-cols-3 mt-19">
      <form
        onSubmit={handleSubmit(handleCreateStreaming)}
        id="createStreaming"
        className="flex flex-col gap-4 w-full col-span-1 bg-slate-800 p-8 rounded-lg text-slate-200"
      >
        <h2 className="text-4xl font-semibold text-slate-200 mb-4 text-center">
          Create Streaming
        </h2>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-slate-200 text-[20px]">
            Name:
          </label>
          <input
            autoFocus
            {...register("name", {
              onChange: (e) =>
                setNewStreamingPreview({
                  ...newStreamingPreview,
                  name: e.target.value,
                }),
            })}
            id="name"
            placeholder="Insert name"
            type="text"
            className={twMerge(
              "border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0",
              errors.name && "border-red-600"
            )}
          />
          {<span className="text-sm text-red-600">{errors.name?.message}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-slate-200 text-[20px]">
            ImageUrl:
          </label>
          <input
            {...register("imageUrl", {
              onChange: (e) =>
                setNewStreamingPreview({
                  ...newStreamingPreview,
                  imageUrl: e.target.value,
                }),
            })}
            id="imageUrl"
            placeholder="Insert image URL"
            type="text"
            className={twMerge(
              "border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0",
              errors.imageUrl && "border-red-600"
            )}
          />
          {
            <span className="text-sm text-red-600">
              {errors.imageUrl?.message}
            </span>
          }
        </div>
        <button
          type="submit"
          className="w-full h-8 bg-slate-600 rounded-2xl text-slate-200 cursor-pointer"
        >
          Create Streaming
        </button>
      </form>
      <div></div>
      <div className="flex gap-4 mt-2">
        <div className="text-white px-4 py-1 h-10 rounded-lg bg-slate-500 flex items-center gap-2 relative group">
          <img className="w-8" src={newStreamingPreview.imageUrl} alt="" />
          <p className="cursor-default">{newStreamingPreview.name}</p>
          {/* <X
            // onClick={() => removeSelectedStreaming(i)}
            className="absolute right-0 top-2.25 w-4 hidden group-hover:block cursor-pointer"
          /> */}
        </div>
      </div>
      {createStreamingError && (
        <span className="absolute bottom-4 right-4 text-white rounded-lg px-4 py-2 bg-red-600 animate-bounce">
          {createStreamingError}
        </span>
      )}
      {createStreamingSucess && (
        <span className="absolute bottom-4 right-4 text-white rounded-lg px-4 py-2 bg-green-400 animate-bounce">
          {createStreamingSucess}
        </span>
      )}
    </div>
  );
};
