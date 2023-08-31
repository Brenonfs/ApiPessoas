import { PeopleRepository } from '../repositories/people.repository';

class CreatePeopleService {
	async execute(name: string, cpf: string, dataNascimento: string) {
		const peopleRepository = new PeopleRepository();
		const people = await peopleRepository.savePeople(name, cpf, dataNascimento);
		return people;
	}
}

export { CreatePeopleService };
