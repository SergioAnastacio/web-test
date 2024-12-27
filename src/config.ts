import { z } from "zod";

const envSchema = z.object({
	API_URL: z.string().url().default("http://localhost:3000"),
});

const { success, error, data } = envSchema.safeParse({
	API_URL: import.meta.env.VITE_API_URL,
});

if (!success) {
	throw new Error(
		`Error variables de entorno: ${JSON.stringify(error.format())}`,
	);
}

//* Exportar variables de entorno validadas con zod
export const { API_URL } = data;
