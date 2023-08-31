import { Request } from 'express';

import { UnauthorizedError } from '../helpers/api-erros';
import { PeopleRepository } from '../repositories/people.repository';

class ListPeopleService {
	async execute(req: Request) {
		const { id } = req.params;
		const peopleRepository = new PeopleRepository();
		const peopleExists = await peopleRepository.findById(Number(id));
		if (!peopleExists) {
			throw new UnauthorizedError('Nenhum post foi encontrado.');
		}
		return peopleExists;
	}
}
export { ListPeopleService };
