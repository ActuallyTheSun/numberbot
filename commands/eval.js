const Discord = require("discord.js")
const fs = require("fs")
module.exports = {
	name: 'eval',
	description: '',
  cooldown: 0,
	execute(bot, msg, args, dbl) {
    const evalusers = ["your id here"]
    const check = evalusers.indexOf(msg.author.id)
    if (check === -1) return;
        else { 
        let evalargs = msg.content.split(" ").slice(1)
        let code = evalargs.join(" ")
        try {
          eval(code)
        }
        catch(e) {
        let errorr = new Discord.MessageEmbed().setTitle("Error!").setColor(0xFF0000).addField(e.name, e.message)
        msg.channel.send(errorr)
        }
        }
	},
};
