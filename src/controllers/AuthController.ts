/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';

import { UnauthorizedError } from '../helpers/api-erros';
import { CreateAuthService } from '../services/authService/createAuth.service';

export class CreateAuth {
	async create(req: Request, res: Response) {
		try {
			const { name, cpf } = req.body;
			const createAuthService = new CreateAuthService();
			const result = await createAuthService.execute(name, cpf);

			return res.json({
				error: false,
				message: 'Sucess',
				result,
			});
		} catch (error) {
			throw new UnauthorizedError(`Erro ao iniciar a autenticar: ${error}`);
		}
	}
}
