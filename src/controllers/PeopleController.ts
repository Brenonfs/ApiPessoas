import { Request, Response } from 'express';

import { UnauthorizedError } from '../helpers/api-erros';
import { CreatePeopleService } from '../services/createPeople.service';
import { DeletePeopleService } from '../services/deletePeople.service';
import { ListPeopleService } from '../services/listPeople.service';
import { SearchPeopleService } from '../services/searchPeople.service';

export class PeopleController {
	async create(req: Request, res: Response) {
		// ao deletar pessoa precisa deletar o usuário?
		try {
			const { name, cpf, dataNascimento } = req.body;
			const createPeopleService = new CreatePeopleService();
			const result = await createPeopleService.execute(name, cpf, dataNascimento);
			if (typeof result === 'object' && 'id' in result) {
				return res.json({
					error: false,
					message: 'Sucesso: pessoa criada',
					result,
				});
			} else {
				return res.json({
					error: false,
					message: 'Não foi possível criar pessoa, ja tem esse cpf cadastrado',
					result,
				});
			}
		} catch (error) {
			throw new UnauthorizedError(`Não foi possível criar o usuário: ${error}`);
		}
	}
	async delete(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const deletePeopleService = new DeletePeopleService();
			const result = await deletePeopleService.execute(id);

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
			const { id } = req.params;
			const listPeopleService = new ListPeopleService();
			const result = await listPeopleService.execute(id);

			return res.json({
				error: false,
				message: 'Sucess: person listed',
				result,
			});
		} catch (error) {
			throw new UnauthorizedError(`Não foi possível listar o pessoa: ${error}`);
		}
	}
	async search(req: Request, res: Response) {
		try {
			const cpf = req.query.cpf as string;
			console.log(cpf);
			const searchPeopleService = new SearchPeopleService();
			const result = await searchPeopleService.execute(cpf);

			return res.json({
				error: false,
				message: 'Sucess: person find',
				result,
			});
		} catch (error) {
			throw new UnauthorizedError(`Não foi possível encontrar a pessoa: ${error}`);
		}
	}
}
