import type { CommandInteraction, Client, Message } from 'discord.js';
import type { SlashCommandBuilder } from '@discordjs/builders';

export interface Handler {
	client: Client;
}

export interface Slash {
	name: string;
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
