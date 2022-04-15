import type {
	Collection,
	CommandInteraction,
	Client,
	Message,
} from 'discord.js';
import type { Database } from '@devsnowflake/quick.db';
import type { SlashCommandBuilder } from '@discordjs/builders';

declare module 'discord.js' {
	export interface Client {
		commands: Collection<string, ICommand>;
		slashCommands: ISlash[];
	}
}

export interface IHandler {
	client: Client;
	db: Database;
}

export interface ISlash {
	command: SlashCommandBuilder;
	run(args: ISlashArgs): Promise<void>;
}

export interface ICommand {
	name: string;
	run(args: ICommandArgs): void | Promise<void>;
}

export interface ISlashArgs {
	client: Client;
	interaction: CommandInteraction;
	db: Database;
}

export interface ICommandArgs {
	client: Client;
	message: Message;
	args: string[];
	db: Database;
}
