const Discord = require("discord.js")
const fs = require("fs")
module.exports = {
	name: 'coinflip',
	description: '',
  aliases: ["cf"],
	execute(bot, msg, args, gtn, maxnr, endtime) {
		const options = ["Heads", "Tails"]
    const pick = options[Math.floor(Math.random() * 2)]
    msg.channel.send(new Discord.MessageEmbed().setTitle("Coin flip").setColor("0xb09000").setDescription(`You flipped **${pick}!**`))
	},
};
