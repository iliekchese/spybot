import type {
	Collection,
	CommandInteraction,
	Client,
	Message,
} from 'discord.js';
import type { SlashCommandBuilder } from '@discordjs/builders';

declare module 'discord.js' {
	export interface Client {
		commands: Collection<string, Command>;
		slashCommands: Slash[];
	}
}

export interface Handler {
	client: Client;
	db: any;
}

export interface Slash {
	command: SlashCommandBuilder;
	run(args: SlashArgs): Promise<void>;
}

export interface Command {
	name: string;
	run(args: CommandArgs): void | Promise<void>;
}

export interface SlashArgs {
	client: Client;
	interaction: CommandInteraction;
}

export interface CommandArgs {
	client: Client;
	message: Message;
	args: string[];
}
