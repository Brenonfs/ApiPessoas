/* eslint-disable import/no-extraneous-dependencies */
import { sign } from 'jsonwebtoken';

import { jwtConfig } from '../../config/auth';
import { UnauthorizedError } from '../../helpers/api-erros';
import { AuthRepository } from '../../repositories/auth.repository';

class CreateAuthService {
	async execute(name: string, cpf: string) {
		const authRepository = new AuthRepository();
		const userExist = await authRepository.findByName(name);

		if (!userExist) {
			throw new UnauthorizedError('Nome e/ou cpf incorreto 1');
		}
		const cpfMatched = cpf === userExist.cpf;
		if (!cpfMatched) {
			throw new UnauthorizedError('Nome e/ou cpf incorreto 2');
		}
		if (jwtConfig && jwtConfig.secret !== undefined) {
			const { secret, expiresIn } = jwtConfig;
			const token = sign({}, secret, {
				subject: String(userExist.id),
				expiresIn,
			});
			return {
				user: userExist,
				token,
			};
		}
	}
}

export { CreateAuthService };
