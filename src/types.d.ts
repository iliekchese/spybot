import type { CommandInteraction, Client, Message } from 'discord.js';
import type { SlashCommandBuilder } from '@discordjs/builders';

export type Logger = (client: Client) => void;

export interface Slash {
	data: SlashCommandBuilder;
	run(args: SlashArgs): Promise<void>;
}

export interface Command {
	name: string;
	aliases?: string[];
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
