import { Request } from 'express';

import { UnauthorizedError } from '../helpers/api-erros';
import { PeopleRepository } from '../repositories/people.repository';

class DeletePeopleService {
	async execute(id: any) {
		const peopleRepository = new PeopleRepository();
		const peopleExists = await peopleRepository.findById(id);
		if (!peopleExists) {
			throw new UnauthorizedError('Nenhuma pessoa foi encontrada.');
		}
		const people = await peopleRepository.deletePeople(id);
		return people;
	}
}
export { DeletePeopleService };
