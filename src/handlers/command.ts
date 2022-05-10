import type { Handler } from '../types';
import { readdir } from 'node:fs/promises';
import { Loxt } from 'loxt';

export const handler = async ({ client }: Handler) => {
	const loxt = new Loxt();
	(await readdir('./commands/'))
		.filter(file => file.endsWith('.js'))
		.forEach(async file => {
			const { default: pull } = await import(`../commands/${file}`);
			client.commands.set(pull.name, pull);
		});
	loxt.info('Commands Loaded!');
};
