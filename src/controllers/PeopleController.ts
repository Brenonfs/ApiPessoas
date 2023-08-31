import { Request, Response } from 'express';

import { UnauthorizedError } from '../helpers/api-erros';
import { CreatePeopleService } from '../services/createPeople.service';
import { DeletePeopleService } from '../services/deletePeople.service';
import { ListPeopleService } from '../services/listPeople.service';

export class PeopleController {
	async create(req: Request, res: Response) {
		try {
			const { name, cpf, dataNascimento } = req.body;
			const createPeopleService = new CreatePeopleService();
			const result = await createPeopleService.execute(name, cpf, dataNascimento);

			return res.json({
				error: false,
				message: 'Sucess: person created',
				result,
			});
		} catch (error) {
			throw new UnauthorizedError(`Não foi possível criar o usuário: ${error}`);
		}
	}
	async delete(req: Request, res: Response) {
		try {
			const deletePeopleService = new DeletePeopleService();
			const result = await deletePeopleService.execute(req);

			return res.json({
				error: false,
				message: 'Sucess: person deleted',
				result,
			});
		} catch (error) {
			throw new UnauthorizedError(`Não foi possível deletar o usuário: ${error}`);
		}
	}
	async list(req: Request, res: Response) {
		try {
			const listPeopleService = new ListPeopleService();
			const result = await listPeopleService.execute(req);

			return res.json({
				error: false,
				message: 'Sucess: person listed',
				result,
			});
		} catch (error) {
			throw new UnauthorizedError(`Não foi possível listar o post: ${error}`);
		}
	}
}
