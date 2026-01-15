import z from "zod";

export const registerCategorySchema = z.object({
  name: z.string().nonempty("Insert Category Name")
})

export type registerCategoryInfoSchema = z.infer<typeof registerCategorySchema>