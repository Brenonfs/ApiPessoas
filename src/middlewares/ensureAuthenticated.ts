import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { jwtConfig } from '../config/auth';
import { UnauthorizedError } from '../helpers/api-erros';

const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		throw new UnauthorizedError('JWT Token não informado');
	} // pq n entra?

	const [, token] = authHeader.split(' ');

	try {
		if (jwtConfig && jwtConfig.secret !== undefined) {
			const decodedToken = verify(token, jwtConfig.secret) as { sub: string };

			return next();
		} else {
			throw new Error('JWT configuration is not properly set');
		}
	} catch {
		throw new UnauthorizedError('JWT Token invalid');
	}
};

export { ensureAuthenticated };
