import { Client, Collection, Intents } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';
import Fastify from 'fastify';
import { readdir } from 'node:fs/promises';
import { Loxt } from "loxt"

const loxt = new Loxt()

process.on('uncaughtException', (err) => loxt.error(err));

readdir('./handlers/').then(handlers => 
	handlers
		.filter(file => file.endsWith('.js'))
		.forEach(file => import(`./handlers/${file}`).then(({ handler }) => handler({ client })))
)

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN || '');

loxt.start('Loading')

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Collection();
client.slashCommands = [];
loxt.info('made by eldi mindcrafter#0001 & AngelNext#9162')

// ------- LOAD COMMANDS -----
client.once('ready', async () => {
	try {
		await rest.put(Routes.applicationCommands('939629038178295828'), {
			body: client.slashCommands.map(c => c.command.toJSON()),
		});
		loxt.ready('application commands')
	} catch (error) {
		if (error instanceof Error) {
			loxt.error(error)
		}
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
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.slashCommands.find(c => c.command.name === interaction.commandName);
	command?.run({ client, interaction });
});

client.on('messageCreate', async message => {
	const prefix = '.';

	const { content, author } = message;
	
	if (author.bot) return;
	if (!content.startsWith(prefix)) return;

	const args = content.slice(prefix.length).trim().split(/ +/);
	const cmd = args.shift()?.toLowerCase();

	const command = client.commands.get(cmd!);
	command?.run({ client, message, args });
});


// -------- START BOT ------------
(async () => {
	const server = Fastify();
	server.get('/', async () => 'Bot is ready!');
	
	try {
		await server.listen(3000, '0.0.0.0');
		await client.login(process.env.TOKEN);
	} catch (_) {
		loxt.error('The bot or the server failed to start');
	}
})()
