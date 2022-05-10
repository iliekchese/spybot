import type { Handler } from '../types';
import { readdir } from 'node:fs/promises';
import { Loxt } from 'loxt';

export const handler = async ({ client }: Handler) => {
	const loxt = new Loxt();
	(await readdir('./slash-commands/'))
		.filter(file => file.endsWith('.js'))
		.forEach(async file => {
			const { default: pull } = await import(`../slash-commands/${file}`);
			client.slashCommands.push(pull);
		});
	loxt.info('Slash Commands Loaded!');
};
