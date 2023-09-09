import { UnauthorizedError } from '../helpers/api-erros';
import { PeopleRepository } from '../repositories/people.repository';

class CreatePeopleService {
	async execute(name: string, cpf: string, dataNascimento: string) {
		const peopleRepository = new PeopleRepository();
		const userExists = await peopleRepository.findByCpf(cpf);
		if (userExists) {
			console.log('entrei');
			return userExists.id;
		}
		const people = await peopleRepository.savePeople(name, cpf, dataNascimento);

		return people;
	}
}

export { CreatePeopleService };
