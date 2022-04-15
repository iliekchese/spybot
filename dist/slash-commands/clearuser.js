import { SlashCommandBuilder } from '@discordjs/builders';
export default {
    command: new SlashCommandBuilder()
        .setName('clearuser')
        .setDescription('Clears user')
        .addUserOption(user => user.setName('user').setDescription('The user to clear').setRequired(true)),
    async run({ interaction, db }) {
        const user = interaction.options.getUser('user');
        [
            `${interaction.guild?.id}_${user?.id}_rolecreate`,
            `${interaction.guild?.id}_${user?.id}_roledelete`,
            `${interaction.guild?.id}_${user?.id}_channelcreate`,
            `${interaction.guild?.id}_${user?.id}_channeldelete`,
            `${interaction.guild?.id}_${user?.id}_banlimit`,
            `${interaction.guild?.id}_${user?.id}_kicklimit`,
        ].forEach(mod => db.delete(mod));
        await interaction.reply('**Done!**');
    },
};
