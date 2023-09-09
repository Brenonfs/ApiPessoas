import { prisma } from '../database';

export class PeopleRepository {
	posts = [];
	async savePeople(name: string, cpf: string, dataNascimento: string) {
		const people = await prisma.people.create({
			data: { name, cpf, dataNascimento },
		});
		return people;
	}
	async findById(id: any) {
		const postExist = await prisma.people.findUnique({
			where: { id },
		});
		return postExist;
	}
	async findByCpf(cpf: string) {
		const postExist = await prisma.people.findUnique({
			where: { cpf },
		});
		return postExist;
	}
	async deletePeople(id: any) {
		const post = await prisma.people.delete({
			where: {
				id,
			},
		});
		return post;
	}
}
