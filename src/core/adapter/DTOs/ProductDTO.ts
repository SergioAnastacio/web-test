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

//* Implement Custom DTO for Save Product Request
//* Zod does not support file type , we can mark as any and redefine like Createat and updateat

export interface ProductSaveDTO {
	id?: number;
	name: string;
	price: number;
	qty: number;
	urls: string[];
	images: File[];
	create_at?: string;
	update_at?: string;
}
export const saveProductDTOSchema = z.object({
	id: z.number(),
	name: z.string(),
	price: z.number(),
	qty: z.number(),
	urls: z.string().array(),
	images: z
		.array(z.any())
		.refine((files) => files.every((file) => file instanceof File), {
			message: "Cada elemento debe ser un archivo",
		}), //! Server will handle  file validation
	create_at: z.string().optional(), //! Server will handle this
	update_at: z.string().optional(), //! Server will handle this
});

export const productsDTOSchema = productDTOSchema.array();
export const saveProductsSchema = saveProductDTOSchema.array();

export type ProductDTO = z.infer<typeof productDTOSchema>; //! single productDTO
export type ProductsDTO = z.infer<typeof productsDTOSchema>; //! array of productDTO
