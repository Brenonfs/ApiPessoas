import { Request } from 'express';

import { UnauthorizedError } from '../helpers/api-erros';
import { PeopleRepository } from '../repositories/people.repository';

class SearchPeopleService {
	async execute(cpf: any) {
		const peopleRepository = new PeopleRepository();
		const peopleExists = await peopleRepository.findByCpf(cpf);
		if (!peopleExists) {
			throw new UnauthorizedError('Nenhuma pessoa foi encontrada.');
		}
		return peopleExists;
	}
}
export { SearchPeopleService };
