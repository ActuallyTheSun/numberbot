const Discord = require("discord.js")
const fs = require("fs")
module.exports = {
	name: 'help',
	description: '',
  aliases: ["h"],
	execute(bot, msg, args, gtn, maxnr, endtime) {
  const oldhelp = new Discord.MessageEmbed().setTitle("NumberBot Help").setColor("0xb09000").setDescription("[GitHub repo](https://github.com/ActuallyTheSun/numberbot)")
    .addField("Guess The Number", `You can start a game of \"Guess the Number\" by using __nr!guess-the-number/nr!gtn [channel] [the max number] [the time to guess] (-shownumber)__
  **Channel:** The channel to start Guess The Number in
  **The max number:** The maximum number the round will allow. If its 250, the round will be to guess a number between 1 and 250
  **The time to guess:** The time limit of the round. It can be in m or s, or use none if you dont want a time limit. If the time limit is hit, the game ends with no winner
  **-shownumber:** If you want to show the number in the channel the command was sent in
  Example: __nr!guess-the-number #gtn 1000 10m__ will start a Guess The Number event in #gtn with a number between 1 and 1000 for 10 minutes`)
	  .addField("Counting", `You can make a counting channel using **nr!counting/nr!c**. It can be set up using __nr!counting [channel]__, with channel being a valid channel.
Then, people can start counting there, with the bot maintaining everything you will need`)
    .addField("Others", `**nr!coinflip/nr!cf:** Flip a coin
**nr!dice/nr!die [sides]:** Roll a dice with however many sides you want`)
const mainhelp = new Discord.MessageEmbed().setTitle("NumberBot Help").setColor("0xb09000").setDescription("[GitHub repo](https://github.com/ActuallyTheSun/numberbot)")
.addField("Main commands", `**nr!guess-the-number** [channel] [max nr] [time limit in s/m or \`none\`] (-shownr/-shownumber) - Start a guess the number event in [channel] with a number between 1 and [max nr] for [time limit]\n**nr!counting** - Shows the current coutning channel\n**nr!counting setup** [channel] (-wipe) - Sets the Counting channel to [channel], wiping it if you add -wipe`)
.addField("Unrelated", "**nr!aliases** - Show all the aliases of the bot\n**nr!help** - Shows this message")
.addField("Others", `**nr!coinflip** - Flips a coin, and lands on either Heads or Tails\n**nr!dice** [sides] - Throws a [sides] sided dice\n\n__More coming soon!__`)
  msg.channel.send(mainhelp)
	},
};
