import express, { Request, Response } from 'express';

import 'express-async-errors';
import 'dotenv/config';
import { UnauthorizedError } from './helpers/api-erros';
import { router } from './routes';

const app = express();
app.use(express.json());
app.use(router);

app.use((error: UnauthorizedError, req: Request, res: Response) => {
	if (error instanceof UnauthorizedError) {
		return res.status(error.statusCode).json({
			status: 'error',
			message: error.message,
		});
	}

	console.error(error);

	return res.status(500).json({
		status: 'error',
		message: 'internal error',
	});
});

export { app };
// Voce vai criar uma outra API, vamos chamá-la de API de Pessoas.
// Onde voce vai receber o cpf, nome da pessoa e a data de nascimento e salvar no banco de dados.
// Essa API de Pessoas é protegida. De alguma forma, voce tem que criar um token de acesso para quem quiser se comunicar com essa API.
// Depois, na sua API atual (vamo chamar ela de estudos), voce vai chamar a API de Pessoas antes de cadastrar um usuário.
// Se a pessoa não existir, voce vai cadastrar ela na API de Pessoas e pegar o id dela.
// Depois, voce vai cadastrar o usuário na sua API de estudos, salvando adicionalmente o ID da pessoa criada na APIdePessoas.
