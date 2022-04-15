import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
export default {
    command: new SlashCommandBuilder()
        .setName('whitelist')
        .setDescription('Manage Whitelist of a server')
        .addSubcommand(subcommand => subcommand
        .setName('add')
        .setDescription('Add a user to the whitelist')
        .addUserOption(option => option
        .setName('user')
        .setDescription('The user to add to the whitelist')))
        .addSubcommand(subcommand => subcommand
        .setName('remove')
        .setDescription('Remove a user from the whitelist')
        .addUserOption(option => option
        .setName('user')
        .setDescription('The user to remove from the whitelist')))
        .addSubcommand(subcommand => subcommand
        .setName('show')
        .setDescription('List all users on the whitelist')),
    async run({ interaction, db }) {
        switch (interaction.options.getSubcommand()) {
            case 'add':
                if (interaction.guild?.ownerId === interaction.user.id) {
                    const user = interaction.options.getUser('user');
                    const whitelist = db.get(`whitelist_${interaction.guild.id}`);
                    if (whitelist?.find((x) => x.user === user?.id)) {
                        await interaction.reply(':x: | **The User is already whitelisted**');
                        break;
                    }
                    db.push(`whitelist_${interaction.guild.id}`, { user: user?.id });
                    await interaction.reply(`**The user has been whitelisted!**`);
                    break;
                }
                else {
                    await interaction.reply(':x: | **Only The owner of the Server can whitelist people**');
                    break;
                }
            case 'remove':
                if (interaction.user.id === interaction.guild?.ownerId) {
                    const user = interaction.options.getUser('user');
                    const whitelist = db.get(`whitelist_${interaction.guild.id}`);
                    if (whitelist) {
                        const whitelistedUser = whitelist.find(x => x.user.id === user?.id);
                        if (whitelistedUser) {
                            await interaction.reply(':x: | **The user is not whitelisted!**');
                            break;
                        }
                        const index = whitelist.indexOf(whitelistedUser || {});
                        delete whitelist[index];
                        const fix = whitelist.filter(x => !!x);
                        db.set(`whitelist_${interaction.guild.id}`, fix);
                        await interaction.reply('**The user has been unwhitelisted!**');
                        break;
                    }
                    await interaction.reply(':x: | **The user is not whitelisted!**');
                }
                else {
                    await interaction.reply(':x: | **Only The owner of the Server can unwhitelist people**');
                    break;
                }
            case 'show':
                const embed = new MessageEmbed()
                    .setTitle('**The list of whitelisted users**')
                    .setAuthor({
                    name: interaction.user.tag,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                })
                    .setFooter({
                    text: interaction.guild?.name || '',
                    iconURL: interaction.guild?.iconURL() ?? '',
                })
                    .setThumbnail(interaction.guild?.iconURL() ?? '');
                const whitelisted = db
                    .get(`whitelist_${interaction.guild?.id}`)
                    ?.map((x) => `<@${x.user}>`);
                if (whitelisted?.length) {
                    embed.addField('**Users**', `${whitelisted.join('\n')}`);
                    embed.setColor('GREEN');
                }
                else {
                    embed.setDescription(':x: | **No whitelisted Users Found**');
                    embed.setColor('#FF0000');
                }
                await interaction.reply({ embeds: [embed] });
                break;
        }
    },
};
