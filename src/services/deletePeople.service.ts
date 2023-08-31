import { Request } from 'express';

import { UnauthorizedError } from '../helpers/api-erros';
import { PeopleRepository } from '../repositories/people.repository';

class DeletePeopleService {
	async execute(req: Request) {
		const { id } = req.params;
		const peopleRepository = new PeopleRepository();
		const peopleExists = await peopleRepository.findById(Number(id));
		if (!peopleExists) {
			throw new UnauthorizedError('Nenhuma pessoa foi encontrada.');
		}
		const people = await peopleRepository.deletePeople(Number(id));
		return people;
	}
}
export { DeletePeopleService };
