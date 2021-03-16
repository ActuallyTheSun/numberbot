const Discord = require("discord.js")
const fs = require("fs")
module.exports = {
	name: 'dice',
	description: '',
  aliases: ["die"],
	execute(bot, msg, args, gtn, maxnr, endtime) {
		//nr!dice [sides]
    const sides = Number(args[0]) || 6
    if (!sides || sides < 3) return msg.reply("For this command you must give a valid side count that is 3 or more")
    const land = Math.floor(Math.random() * sides + 1)
    msg.channel.send(new Discord.MessageEmbed().setTitle("Roll a dice").setColor("0xb09000").setDescription(`You roll a ${sides}-sided dice and it lands on **${land}**`))
	},
};
