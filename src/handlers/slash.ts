import type { IHandler, ISlash } from '..';
import { readdir } from 'fs/promises';
import { Loxt } from "loxt"

export const handler = async ({ client }: IHandler) => {
	const loxt = new Loxt()
	const commandsDir = await readdir('./slash-commands/');
	commandsDir
		.filter(file => file.endsWith('.js'))
		.forEach(async file => {
			const { default: pull }: { default: ISlash } = await import(
				`../slash-commands/${file}`
			);
			client.slashCommands.push(pull);
		});
	loxt.info('Slash Commands Loaded!');
};
