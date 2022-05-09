import type { Command, Handler } from '../types';
import { readdir } from 'node:fs/promises';
import { Loxt } from 'loxt';

export const handler = async ({ client }: Handler) => {
	const loxt = new Loxt();
	(await readdir('./commands/')).forEach(async dir => {
		(await readdir(`./commands/${dir}/`))
			.filter(file => file.endsWith('.js'))
			.forEach(async file => {
				const { default: pull }: { default: Command } = await import(
					`../commands/${dir}/${file}`
				);
				client.commands.set(pull.name, pull);
			});
	});
	loxt.info('Commands Loaded!');
};
