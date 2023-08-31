import request from 'supertest';

import { app } from './app';

async function createPeople(name: string, cpf: string, dataNascimento: string) {
	const response = await request(app).post('/people').send({
		name,
		cpf,
		dataNascimento,
	});
	return response;
}
describe('Test all', () => {
	it('Criar pessoa', async () => {
		const name = 'Hawk';
		const cpf = 'test1@example.com';
		const dataNascimento = '1990-01-15T00:00:00Z';

		const response = await createPeople(name, cpf, dataNascimento);
		expect(response.statusCode).toEqual(200);
		expect(response.body.result.id).toEqual(1);
		expect(response.body.result.name).toEqual('Hawk');

		const responseSecond = await createPeople(name, cpf, dataNascimento);
		expect(responseSecond.statusCode).toEqual(401);
	});
	it('Deletar pessoa', async () => {
		const name = 'Hawk';
		const cpf = 'test2@example.com';
		const dataNascimento = '1990-01-15T00:00:00Z';

		const response = await createPeople(name, cpf, dataNascimento);
		const responseDeletePeople = await request(app).delete(`/people/${response.body.result.id}`).send({});
		expect(responseDeletePeople.statusCode).toEqual(200);
	});
	it('Listar pessoa', async () => {
		const name = 'Hawk';
		const cpf = 'test3@example.com';
		const dataNascimento = '1990-01-15T00:00:00Z';

		const response = await createPeople(name, cpf, dataNascimento);
		const responseDeletePeople = await request(app).get(`/people/${response.body.result.id}`).send({});
		expect(responseDeletePeople.statusCode).toEqual(200);
	});
	it('Deletar pessoa, erro ao deletar a pessoa n existe', async () => {
		const name = 'Hawk';
		const cpf = 'test4@example.com';
		const dataNascimento = '1990-01-15T00:00:00Z';

		const response = await createPeople(name, cpf, dataNascimento);
		const responseDeletePeople = await request(app).delete(`/people/200`).send({});
		expect(responseDeletePeople.statusCode).toEqual(401);
	});
	it('Listar pessoa, erro ao lista a pessoa n existe', async () => {
		const name = 'Hawk';
		const cpf = 'test5@example.com';
		const dataNascimento = '1990-01-15T00:00:00Z';

		const response = await createPeople(name, cpf, dataNascimento);
		const responseDeletePeople = await request(app).get(`/people/200`).send({});
		expect(responseDeletePeople.statusCode).toEqual(401);
	});
});
