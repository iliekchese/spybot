import { MessageEmbed } from 'discord.js';
const limitTypeCheck = (message, args) => {
    if (!args[1]) {
        message.channel.send(':x: | **Provide The limit**');
        return;
    }
    try {
        if (Number(args[1]) < 1) {
            message.channel.send(':x: | **The limit cannot be zero or negative number**');
            return;
        }
    }
    catch (_) {
        message.channel.send(':x: | **The limit has to be a number**');
        return;
    }
};
export default {
    name: 'config',
    run({ message, args, db }) {
        const bruh = new MessageEmbed()
            .setTitle('<:Settings:939853181180080168> **Anti-Raid | Config**')
            .setDescription(`
					**The Options are listed below:**
					config channelCreateLimit
					config channelDeleteLimit
					config roleCreateLimit
					config roleDeleteLimit
					config banLimit
					config kickLimit
					config logs
					config show
					config punishment
					config help
				`)
            .setColor('#FF0000')
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setAuthor({
            name: message.author.tag,
            iconURL: message.author.displayAvatarURL(),
        })
            .setFooter({
            text: message.guild?.name || ':x:',
            iconURL: message.guild?.iconURL() ?? '',
        });
        switch (args[0]?.toLowerCase()) {
            case 'show':
                const disabled = ':x: Disabled';
                const rcl = db.get(`rolecreate_${message.guild?.id}`)?.toString();
                const rdl = db.get(`roledelete_${message.guild?.id}`)?.toString();
                const ccl = db.get(`channelcreate_${message.guild?.id}`)?.toString();
                const cdl = db.get(`channeldelete_${message.guild?.id}`)?.toString();
                const bl = db.get(`banlimit_${message.guild?.id}`)?.toString();
                const kl = db.get(`kicklimit_${message.guild?.id}`)?.toString();
                const logs = db.get(`logs_${message.guild?.id}`).slice(1);
                const punish = db.get(`punish_${message.guild?.id}`);
                console.log(logs);
                const show = new MessageEmbed()
                    .setTitle('**Anti-Raid | Config**')
                    .setAuthor({
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true }),
                })
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setFooter({
                    text: message.guild?.name || '',
                    iconURL: message.guild?.iconURL() ?? '',
                })
                    .addField('Channel Create Limit', ccl ?? disabled)
                    .addField('Channel Delete Limit', cdl ?? disabled)
                    .addField('Role Create Limit', rcl ?? disabled)
                    .addField('Role Delete Limit', rdl ?? disabled)
                    .addField('Ban Limits', bl ?? disabled)
                    .addField('Kick Limits', kl ?? disabled)
                    .addField('Logs', logs ? `<#${logs}>` : disabled)
                    .addField('Punishment', punish ?? disabled)
                    .setColor('GREEN');
                message.channel.send({ embeds: [show] });
                break;
            case 'channelcreatelimit':
                limitTypeCheck(message, args);
                db.set(`channelcreate_${message.guild?.id}`, Number(args[1]));
                message.channel.send('**The channel Create limit has been set to ' + Number(args[1]) + '**');
                break;
            case 'channeldeletelimit':
                limitTypeCheck(message, args);
                db.set(`channeldelete_${message.guild?.id}`, Number(args[1]));
                message.channel.send('**The channel Delete limit has been set to ' + Number(args[1]) + '**');
                break;
            case 'rolecreatelimit':
                limitTypeCheck(message, args);
                db.set(`rolecreate_${message.guild?.id}`, Number(args[1]));
                message.channel.send('**The role Create limit has been set to ' + args[1] + '**');
                break;
            case 'roledeletelimit':
                limitTypeCheck(message, args);
                db.set(`roledelete_${message.guild?.id}`, Number(args[1]));
                message.channel.send('**The role Delete limit has been set to ' + args[1] + '**');
                break;
            case 'banlimit':
                limitTypeCheck(message, args);
                db.set(`banlimit_${message.guild?.id}`, Number(args[1]));
                message.channel.send('**The ban limit has been set to ' + Number(args[1]) + '**');
                break;
            case 'kicklimit':
                limitTypeCheck(message, args);
                db.set(`kicklimit_${message.guild?.id}`, Number(args[1]));
                message.channel.send('**The kick limit has been set to ' + Number(args[1]) + '**');
                break;
            case 'punishment':
                if (!args[1]) {
                    message.channel.send(':x: | **Provide The punishment**');
                    break;
                }
                if (!(args[1] === 'ban' || args[1] === 'kick' || args[1] === 'demote')) {
                    message.channel.send(':x: | **The punishment can only be kick, ban or demote**');
                    break;
                }
                db.set(`punish_${message.guild?.id}`, args[1].toLowerCase());
                message.channel.send('**The punishment has been set to ' + args[1] + '**');
                break;
            case 'logs':
                const channel = message.mentions.channels.first();
                if (!channel) {
                    message.channel.send(':x: | **Mention The channel**');
                    break;
                }
                else if (channel.guild.id !== message.guild?.id) {
                    message.channel.send(':x: | **That channel is not from this server**');
                    break;
                }
                db.set(`logs_${message.guild?.id}`, `i${channel.id}`);
                channel.send('**Anti Raid logs Channel**');
                message.channel.send('**The logs channel has been set to ' + args[1] + '**');
                break;
            case 'help':
                message.channel.send({ embeds: [bruh] });
                break;
            default:
                message.channel.send(':x: | **Enter a valid subcommand: EXAMPLE: .config help**');
        }
    },
};
