import type {
	Collection,
	CommandInteraction,
	Client,
	Message,
} from 'discord.js';
import type { SlashCommandBuilder } from '@discordjs/builders';

declare module 'discord.js' {
	export interface Client {
		commands: Collection<string, ICommand>;
		slashCommands: ISlash[];
	}
}

interface Data {
	[`${string}_${string}_warns`]: string;
	[`warnlimit_${string}`]: number
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
}

export interface ICommandArgs {
	client: Client;
	message: Message;
	args: string[];
}
