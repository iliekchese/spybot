import type { Command, Handler } from '..';
import { readdir } from 'node:fs/promises';
import { Loxt } from 'loxt';

export const handler = async ({ client }: Handler) => {
	const loxt = new Loxt();
	const commandsDir = await readdir('./commands/');
	commandsDir.forEach(async dir => {
		const commandsTypeDir = await readdir(`./commands/${dir}/`);
		commandsTypeDir
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
