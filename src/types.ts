import type { CommandInteraction, Client, Message } from 'discord.js';
import type { SlashCommandBuilder } from '@discordjs/builders';

export interface Handler {
	client: Client;
}

export interface Slash {
	command: SlashCommandBuilder;
	run(args: SlashArgs): Promise<void>;
}

export interface Command {
	name: string;
	run(args: CommandArgs): void | Promise<void>;
}

interface SlashArgs {
	client: Client;
	interaction: CommandInteraction;
}

interface CommandArgs {
	client: Client;
	message: Message;
	args: string[];
}
