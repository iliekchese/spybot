import { Client, Collection, Intents } from 'discord.js';
import { Routes } from 'discord-api-types/v10';
import { REST } from '@discordjs/rest';
import Fastify from 'fastify';
import { readdir } from 'node:fs/promises';
import { Loxt } from 'loxt';
import { join } from 'node:path';
import type { Command, Logger, Slash } from './types';

const TOKEN = process.env.TOKEN!;
const loxt = new Loxt();
const rest = new REST({ version: '10' }).setToken(TOKEN);
const commands = new Collection<string, Command>();
const slashCommands = new Collection<string, Slash>();
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

process.on('uncaughtException', ({ message }) => loxt.error(message));

loxt.start('Loading');
loxt.info('made by eldi mindcrafter#0001 & AngelNext#9162');

// ------- READY BOT -----
client.once('ready', async () => {
	try {
		await rest.put(Routes.applicationCommands('939629038178295828'), {
			body: slashCommands.map(({ data }) => data.toJSON()),
		});
		loxt.ready('application commands');
	} catch (err) {
		loxt.error(err);
	}
	loxt.info(`Ready on client (${client.user?.tag})`);
	loxt.info(`watching ${client.guilds.cache.size} Servers, ${client.channels.cache.size} channels & ${client.users.cache.size} users`);
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

	commands.get(cmd!)?.run({ client, message, args });
});

/** Read commands and return function with command
 * @param {string} dir - directory to read
 * @returns The function to be called
 * @async
 */
const readCommands = async (dir: string) => {
	const files = await readdir(join(__dirname, dir));
	return (fn: (c: any) => void) =>
		files
			.filter(file => file.endsWith('.js'))
			.forEach(async file => {
				const command = await import(join(__dirname, dir, file));
				fn(command.default);
			});
};

/**
 * Load all commands and handlers.
 * @async
 */
const loadCommands = async () => {
	const loggers = await readCommands('loggers');
	const slash = await readCommands('slash-commands');
	const commandsDir = await readCommands('commands');

	loggers((logger: Logger) => logger(client));
	slash((s: Slash) => slashCommands.set(s.data.name, s));
	commandsDir((c: Command) => {
		commands.set(c.name, c);
		c.aliases?.forEach(a => commands.set(a, c));
	});

	loxt.info('All Commands loaded!');
};

/**
 * Start the bot and all its processes
 * @async
 */
const main = async () => {
	const server = Fastify();
	server.get('/', async () => 'Bot is ready!');

	try {
		await Promise.all([loadCommands(), await server.listen(3000, '0.0.0.0'), await client.login(TOKEN)]);
	} catch (err) {
		loxt.error(err);
	}
};

if (require.main === module) main();
