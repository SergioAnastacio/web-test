import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export type LoginFormDTO = z.infer<typeof loginFormSchema>;
