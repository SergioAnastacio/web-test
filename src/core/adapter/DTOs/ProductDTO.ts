import { z } from "zod";
import { productImageDTOSchema } from "./ProductImageDTO";

//TODO: Prob can define all props in one schema
//TODO: anduse expet , include , pick to get the props
//* Important: create_at and update_at are timestamps from server.
//* transform to Date object in domain layer
export const productDTOSchema = z.object({
	id: z.number(),
	name: z.string(),
	price: z.number(),
	qty: z.number(),
	images: productImageDTOSchema.array(),
	created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
		message: "Invalid date format",
	}),
	updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
		message: "Invalid date format",
	}),
});
export const productsDTOSchema = productDTOSchema.array();

export type ProductDTO = z.infer<typeof productDTOSchema>; //!! single productDTO
export type ProductsDTO = z.infer<typeof productsDTOSchema>; //!! array of productDTO
