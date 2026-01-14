import z from "zod";

export const registerStreamingSchema = z.object({
  name: z.string().nonempty("Insert streaming name"),
  imageUrl: z.string().nonempty("Insert streaming URL image")
})

export type registerStreamingInfoSchema = z.infer<typeof registerStreamingSchema>