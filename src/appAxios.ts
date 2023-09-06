import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import express from 'express';

const app = express();
const port = 5000;

const prisma = new PrismaClient();

app.get('/api/integration', async (req, res) => {
	try {
		// Fazer uma requisição para a API de usuários do projeto 1
		const response = await axios.get('URL_DA_API_DE_USUARIOS_DO_PROJETO_1');

		// Processar a resposta da API de usuários
		const userData = response.data;

		await prisma.user.createMany({
			data: userData.map((user: any) => ({
				name: user.name,
				email: user.email,
				// Mais campos conforme necessário
			})),
		});

		res.json({ message: 'Integração realizada com sucesso' });
	} catch (error) {
		console.error('Ocorreu um erro:', error);
		res.status(500).json({ message: 'Erro na integração' });
	}
});

app.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
});
