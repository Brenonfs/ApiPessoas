import { prisma } from '../database';

export class AuthRepository {
	users = [];
	async findByName(name: string) {
		const userExists = await prisma.people.findFirst({
			where: { name },
		});
		return userExists;
	}
}
