import { Client, Collection, Intents } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';
import Fastify from 'fastify';
import { readdir } from 'node:fs/promises';
import { Loxt } from 'loxt';
import path from 'node:path';
import type { Command, Slash } from './types';

const TOKEN = process.env.TOKEN!;
const loxt = new Loxt();
const rest = new REST({ version: '9' }).setToken(TOKEN);
const commands = new Collection<string, Command>();
const slashCommands = new Collection<string, Slash>();
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

process.on('uncaughtException', ({ message }) => loxt.error(message));

loxt.start('Loading');
loxt.info('made by eldi mindcrafter#0001 & AngelNext#9162');

(async () => {
	(await readdir(path.join(__dirname, `./handlers`)))
		.filter(file => file.endsWith('.js'))
		.forEach(async file => {
			const { handler } = await import(path.join(__dirname, `./handlers/${file}`));
			handler({ client });
		});
	
	(await readdir(path.join(__dirname, `./commands`)))
		.filter(file => file.endsWith('.js'))
		.forEach(async file => {
			const { default: pull }: { default: Command } = await import(
				path.join(__dirname, `./commands/${file}`)
			);
			commands.set(pull.name, pull);
		});
		loxt.info('Commands Loaded!');

	(await readdir(path.join(__dirname, `./slash-commands`)))
		.filter(file => file.endsWith('.js'))
		.forEach(async file => {
			const { default: pull }: { default: Slash } = await import(
				path.join(__dirname, `./slash-commands/${file}`)
			);
			slashCommands.set(pull.command.name, pull);
			pull.command.aliases.forEach((a) => {
				slashCommands.set(a, pull);
			})
		})
	loxt.info('Application Commands loaded!')
})()

// ------- READY BOT -----
client.once('ready', async () => {
	try {
		await rest.put(Routes.applicationCommands('939629038178295828'), {
			body: slashCommands.map(c => c.command.toJSON()),
		});
		loxt.ready('application commands');
	} catch (err) {
		loxt.error(err);
	}
	loxt.info(`Ready on client (${client.user?.tag})`);
	loxt.info(
		`watching ${client.guilds.cache.size} Servers, ${client.channels.cache.size} channels & ${client.users.cache.size} users`
	);
	client.user?.setActivity(' for Raiders | .help', {
		type: 'WATCHING',
	});
});

// ------- MAKE COMMANDS INTERACT -----
client.on('interactionCreate', interaction => {
	if (interaction.user.bot) return;
	if (!interaction.isCommand()) return;
	slashCommands.get(interaction.commandName)?.run({ client, interaction });
});

client.on('messageCreate', message => {
	const PREFIX = '.';
	const { content, author } = message;

	if (author.bot) return;
	if (!content.startsWith(PREFIX)) return;

	const args = content.slice(PREFIX.length).trim().split(/ +/);
	const cmd = args.shift()?.toLowerCase();

	(commands.get(cmd!))?.run({ client, message, args });
});

// -------- START BOT ------------
const main = async () => {
	const server = Fastify();
	server.get('/', async () => 'Bot is ready!');

	try {
		await server.listen(3000, '0.0.0.0');
		await client.login(TOKEN);
	} catch (err) {
		throw err;
	}
};

if (require.main === module) main();
