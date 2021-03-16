const Discord = require("discord.js")
const fs = require("fs")
module.exports = {
	name: 'guessthenumber',
	description: '',
  aliases: ["guess-the-number", "gtn"],
	execute(bot, msg, args, gtn, maxnr, endtime) {
		//nr!gtn [channel] [max nr] [time limit in s/m or none] (-shownr/-shownumber)
		let countchannel = JSON.parse(fs.readFileSync("./counting/channel.json", "utf8"));
		if (!msg.member.permissions.has("MANAGE_CHANNELS")) return msg.reply("you need \`Manage Channels\` To start a Guess The Number event")
    const myperms = ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES", "MANAGE_CHANNELS"]
  	if (myperms.some(p => !msg.guild.me.permissions.has(p))) return msg.reply("I am missing permisssions required for the event. Make sure I have: \`Read Messages\`, \`Send Messages\`, \`Link Embeds\`, \`Manage Messages\`, \`Manage Channel\`")
		if (!args[0]) return msg.reply("You need to tag a valid channel, like #guess-the-number\n*Usage: nr!gtn [channel] [max nr] [time limit in s/m - or \`none\`] (-shownr/-shownumber)*")
		//const channelargs = args[0].slice(2, -1)
                                  const channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[0])
    const max = Number(args[1])
		let timeargs = args[2]
		//const channel = msg.guild.channels.cache.get(channelargs)
		if (!channel) return msg.reply("You need to tag a valid channel, like #guess-the-number\n*Usage: nr!gtn [channel] [max nr] [time limit in s/m - or \`none\`] (-shownr/-shownumber)*")
		if (channel.id == countchannel[msg.guild.id]) return msg.reply("Why would you want to start an event in a counting channel?")
		if (!max || max < 1) return msg.reply("You must give a valid number so people can count up to it\n*Usage: nr!gtn [channel] [max nr] [time limit in s/m - or \`none\`] (-shownr/-shownumber)*")
		if (!timeargs) return msg.reply("You must give a valid time in m or s, or \`none\` if you dont want a time limit\n*Usage: nr!gtn [channel] [max nr] [time limit in s/m - or \`none\`] (-shownr/-shownumber)*")
		if (timeargs == "none") timeargs = "9999999999999999m"
		let time = Number(timeargs.slice(0, -1)); let unit = timeargs.slice(-1)
		if (!time) return msg.reply("You must give a valid time in m or s, or \`none\` if you dont want a time limit\n*Usage: nr!gtn [channel] [max nr] [time limit in s/m - or \`none\`] (-shownr/-shownumber)*")
		if (unit != "s" && unit != "m") return msg.reply("You must give a valid time in m or s, or \`none\` if you dont want a time limit\n*Usage: nr!gtn [channel] [max nr] [time limit in s/m - or \`none\`] (-shownr/-shownumber)*")
		let endingtime = Date.now() / 1000 | 0
		if (unit == "s") endingtime = endingtime + time
		else if (unit == "m") endingtime = endingtime + (time*60)
    const nr = Math.floor(Math.random() * max + 1)
		channel.setRateLimitPerUser(3)
		msg.channel.send(new Discord.MessageEmbed().setColor("0xb09000").setDescription(`Succesfully started a Guess The Number event in <#${channel.id}>`))
		if (args[3] == "-shownr" || args[3] == "-shownumber") msg.reply(`The number is ${nr}`)
    gtn.set(channel.id, nr)
		maxnr.set(channel.id, max)
		endtime.set(channel.id, endingtime)
	},
};
