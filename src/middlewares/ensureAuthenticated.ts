import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { jwtConfig } from '../config/auth';
import { UnauthorizedError } from '../helpers/api-erros';

// declare module 'express-serve-static-core' {
// 	// isso aqui q eu n entendi direito
// 	interface Request {
// 		user?: {
// 			id: number;
// 		};
// 	}
// }
const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	console.log(authHeader);
	if (!authHeader) {
		const { secret } = req.headers;
		console.log(secret);
		if (!secret) {
			throw new UnauthorizedError('JWT Token não informado ');
		} //
		try {
			if (secret === process.env.SECRET_TOKEN) {
				return next();
			} else {
				throw new Error('JWT  admin configuration is not properly set');
			}
		} catch {
			throw new UnauthorizedError('JWT Token admin invalid');
		}
	} // pq n entra?

	const [, token] = authHeader.split(' ');

	try {
		if (jwtConfig && jwtConfig.secret !== undefined) {
			const decodedToken = verify(token, jwtConfig.secret) as { sub: string };
			// req.user = {
			// 	id: Number(decodedToken.sub),
			// };
			return next();
		} else {
			throw new Error('JWT configuration is not properly set');
		}
	} catch {
		throw new UnauthorizedError('JWT Token invalid');
	}
};

export { ensureAuthenticated };
