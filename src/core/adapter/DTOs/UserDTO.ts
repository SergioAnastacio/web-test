import { z } from "zod";
export const userDTOSchema = z.object({
	id: z.number(),
	name: z.string(),
	email: z.string().email(),
});
export type UserDTO = z.infer<typeof userDTOSchema>;
