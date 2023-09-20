import { z } from 'zod';

export const peopleCreateSchema = z.object({
	name: z.string(),
	cpf: z.string(),
	dataNascimento: z.string(),
});
