import axios from 'axios';

// URL da primeira API
const api1Url = 'https://localhost:5000/';

// URL da segunda API
const api2Url = 'https://localhost:5000/';

// Função para fazer a requisição para a primeira API
axios
	.get(api1Url)
	.then((response) => {
		console.log('Resposta da API 1:', response.data);
		// Agora você pode processar os dados da primeira API ou fazer a próxima requisição
		return axios.get(api2Url);
	})
	.then((response) => {
		console.log('Resposta da API 2:', response.data);
		// Aqui você pode continuar processando os dados da segunda API, se necessário
	})
	.catch((error) => {
		console.error('Ocorreu um erro:', error);
	});
