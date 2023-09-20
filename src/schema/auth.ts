import { z } from 'zod';

export const authCreateSchema = z.object({
	name: z.string(),
	cpf: z.string(),
});
