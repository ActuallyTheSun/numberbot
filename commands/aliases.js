const Discord = require("discord.js")
const fs = require("fs")
module.exports = {
	name: 'aliases',
	description: '',
	execute(bot, msg, args, gtn, maxnr, endtime) {
		msg.channel.send(new Discord.MessageEmbed().setTitle("All aliases").setColor("0xb09000").setDescription("__nr!guess-the-number:__ nr!guessthenumber, nr!gtn\n__nr!counting:__ nr!c\n__nr!coinflip__ - nr!cf\n__nr!help:__ nr!h\n__nr!invite:__ nr!add"))
	},
};
