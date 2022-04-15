import type { IHandler, ISlash } from '..';
import { readdir } from 'fs/promises';

export const handler = async ({ client }: IHandler) => {
	const commandsDir = await readdir('./slash-commands/');
	commandsDir
		.filter(file => file.endsWith('.js'))
		.forEach(async file => {
			const { default: pull }: { default: ISlash } = await import(
				`../slash-commands/${file}`
			);
			client.slashCommands.push(pull);
		});
	console.log('-------------------------------------');
	console.log('[INFO]: Slash Commands Loaded!');
};
