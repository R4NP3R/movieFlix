import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import {
  registerCategorySchema,
  type registerCategoryInfoSchema,
} from "../../zodSchemas/registerCategorySchema";
import { createCategory } from "../../api";

export const CategoryManagerPage = () => {
  const [newCategory, setNewCategory] = useState<registerCategoryInfoSchema>({
    name: "New Category",
  });
  const [createCategoryError, setCreateCategoryError] = useState<string | null>(null)
  const [createCategorySucess, setCreateCategorySucess] = useState<string | null>(null)
  const { register, handleSubmit, reset, formState: {errors} } = useForm<registerCategoryInfoSchema>({
    resolver: zodResolver(registerCategorySchema),
  });

  useEffect(() => {
    if (newCategory.name === "") {
      setNewCategory({ name: "New Category" });
    }
  }, [newCategory]);

  async function handleCreateCategory(data: registerCategoryInfoSchema) {
    if(data.name == "New Category") {
      return;
    }
    const result = await createCategory(data)

    if (result?.status === 409) {
      setCreateCategoryError(result.data)

      setTimeout(() => {
        setCreateCategoryError(null)
      }, 3000)
    }

    if (result?.status === 201) {
      setCreateCategorySucess("Category created!")
      reset()
      setNewCategory({name: "New Category"})

      setTimeout(() => {
        setCreateCategorySucess(null)
      }, 3000)
    }

  }

  return (
    <div className="grid grid-cols-3 mt-19">
      <form
        onSubmit={handleSubmit(handleCreateCategory)}
        id="createCategory"
        className="flex flex-col gap-4 w-full col-span-1 bg-slate-800 p-8 rounded-lg text-slate-200"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="text-slate-200 text-[20px]">
            Name:
          </label>
          <input
            autoFocus
            {...register("name", {
              onChange: (e) => setNewCategory({name: e.target.value}),
            })}
            id="name"
            placeholder="Insert name"
            type="text"
            className={twMerge(
              "border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0", errors.name && "border-red-600"
            )}
          />
          {<span className="text-sm text-red-600">{errors.name?.message}</span>}
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
        <div className="px-4 py-1 rounded-lg bg-slate-500 relative group cursor-default h-10 flex items-center">
          <p className="text-white ">{newCategory.name}</p>
          {/* <X
          onClick={() => removeSelectedCategory(i)}
          className="absolute right-0 top-1.25 w-4 hidden group-hover:block cursor-pointer"
        /> */}
        </div>
      </div>
      {createCategoryError && (
        <span className="absolute bottom-4 right-4 text-white rounded-lg px-4 py-2 bg-red-600 animate-bounce">
          {createCategoryError}
        </span>
      )}
      {createCategorySucess && (
        <span className="absolute bottom-4 right-4 text-white rounded-lg px-4 py-2 bg-green-400 animate-bounce">
          {createCategorySucess}
        </span>
      )}
    </div>
  );
};
