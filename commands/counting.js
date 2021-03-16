const Discord = require("discord.js")
const fs = require("fs")
module.exports = {
	name: 'counting',
	description: '',
  aliases: ["count", "c"],
	execute(bot, msg, args, gtn, maxnr, endtime) {
    let channel = JSON.parse(fs.readFileSync("./counting/channel.json", "utf8"));
    let currentnr = JSON.parse(fs.readFileSync("./counting/currentnr.json", "utf8"));
    if (args[0] == "setup") {
			if (!msg.member.permissions.has("MANAGE_GUILD")) return msg.channel.send("You need the \`Manage Server\` permissions to use this command")
      const channela = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[1])
			const cid = channela.id
      if (!channela) return msg.channel.send("You must tag an actual channel for this command, like #counting")
			if (gtn.has(channela.id)) return msg.channel.send("Why would you turn a GTN channel into a counting channel?")
      channel[msg.guild.id] = cid
      fs.writeFile("./counting/channel.json", JSON.stringify(channel), (err) => {
        if (err) console.log(err)
      })
if (!currentnr[msg.guild.id]) {
currentnr[msg.guild.id] = 0
      fs.writeFile("./counting/currentnr.json", JSON.stringify(currentnr), (err) => {
        if (err) console.log(err)
      })
}
      if (args[2] == "-wipe") {
				msg.channel.send(`Are you sure you want to set the counting channel to <#${channela.id}> and wipe the old count the server hit? React with ✅ in 10 seconds to confirm`).then(m => {
					m.react("✅")
					const filter = (reaction, user) => {
	return reaction.emoji.name === '✅' && user.id === msg.author.id;
};

m.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
	.then(collected => {
		currentnr[msg.guild.id] = 0
	fs.writeFile("./counting/currentnr.json", JSON.stringify(currentnr), (err) => {
		if (err) console.log(err)
  msg.channel.send(`Succesfully set the counting channel in this server to <#${channela.id}>.`)

	})
})
	.catch(collected => {
		msg.channel.send("Cancelled. Channel has been changed without clearing the count")
	});

				})
			}
		channela.setRateLimitPerUser(3)
		if (args[2] != "-wipe") return msg.channel.send(`Succesfully set the counting channel in this server to <#${channela.id}>. If you want to wipe the old count in the channel, use \`nr!counting setup #channel -wipe\``)
    }
		if (args[0] != "setup") {
		if (!channel[msg.guild.id]) return msg.channel.send("No channel has been set for counting in this server. If you want to make one, use \`nr!counting setup [channel]\`")
		msg.channel.send(`The counting channel for ${msg.guild.name} is <#${channel[msg.guild.id]}>, with the current number being **${currentnr[msg.guild.id]}**`)
	}
  },
}
