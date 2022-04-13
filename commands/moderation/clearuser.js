export default {
  name: "clearuser",
  run: async (_, message, __, db) => {
    const user = message.mentions.users.first()
    const userMods = [`${message.guild.id}_${user.id}_rolecreate`, `${message.guild.id}_${user.id}_roledelete`, `${message.guild.id}_${user.id}_channelcreate`, `${message.guild.id}_${user.id}_channeldelete`, `${message.guild.id}_${user.id}_banlimit`, `${message.guild.id}_${user.id}_kicklimit`]
    userMods.forEach(mod => db.delete(mod))
    return message.channel.send("**Done!**")
  }
}
