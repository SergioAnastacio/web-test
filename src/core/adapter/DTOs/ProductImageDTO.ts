import { z } from "zod";
export const productImageDTOSchema = z.object({
	id: z.number(),
	url: z.string().url(),
});

export type ProductImageDTO = z.infer<typeof productImageDTOSchema>;
