import { readdirSync } from 'fs';

export const handler = (client) => {
	readdirSync('./slash-commands/')
		.filter((file) => file.endsWith('.js'))
		.forEach(async (file) => {
			const { default: pull } = await import(`../slash-commands/${file}`);
			client.slashCommands.push(pull);
		});
	console.log('-------------------------------------');
	console.log('[INFO]: Slash Commands Loaded!');
};
