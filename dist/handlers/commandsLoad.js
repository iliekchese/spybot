export const handler = ({ client, db }) => {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand())
            return;
        const command = client.slashCommands.find(c => c.command.name === interaction.commandName);
        command?.run({ client, interaction, db });
    });
    client.on('messageCreate', async (message) => {
        const prefix = '.';
        const { content, author } = message;
        if (author.bot)
            return;
        if (!content.startsWith(prefix))
            return;
        const args = content.slice(prefix.length).trim().split(/ +/);
        const cmd = args.shift()?.toLowerCase();
        const command = client.commands.get(cmd || '');
        command?.run({ client, message, args, db });
    });
};
