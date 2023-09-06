import { prisma } from '../database';

export class PeopleRepository {
	posts = [];
	async savePeople(name: string, cpf: string, dataNascimento: string) {
		const people = await prisma.people.create({
			data: { name, cpf, dataNascimento },
		});
		return people;
	}
	async findById(id: number) {
		const postExist = await prisma.people.findUnique({
			where: { id: Number(id) },
		});
		return postExist;
	}
	async findByCpf(cpf: string) {
		const postExist = await prisma.people.findUnique({
			where: { cpf },
		});
		return postExist;
	}
	async deletePeople(id: number) {
		const post = await prisma.people.delete({
			where: {
				id: Number(id),
			},
		});
		return post;
	}
}
