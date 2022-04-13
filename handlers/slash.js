import { readdirSync } from 'fs';

export const handler = (client) => {
	readdirSync('./slash-commands/')
		.filter((file) => file.endsWith('.js'))
		.forEach(async (file) => {
			const { default: pull } = await import(`../slash-commands/${file}`);
			if (pull.name) {
				client.slashCommands.set(pull.name, pull);
				console.log(`[${pull.name.toUpperCase()}]: loaded!`);
			} else console.log(`[${file.toUpperCase()}]: Error`);
		});
};
