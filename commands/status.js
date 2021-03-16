const Discord = require("discord.js")
const fs = require("fs")
module.exports = {
	name: 'status',
	description: '',
	execute(bot, msg, args) {
    const properuptime = `${Math.floor((bot.uptime/(1000*60*60*24))%60)} days, ${Math.floor((bot.uptime/(1000*60*60))%60)} hours, ${Math.floor((bot.uptime/(1000*60))%60)} minutes, ${Math.floor((bot.uptime/1000)%60)} seconds`
    const stats = new Discord.MessageEmbed().setTitle("Bot stats").setColor(0xB09000).setDescription(`[GitHub repo](https://github.com/ActuallyTheSun/numberbot)
Servers: ${bot.guilds.cache.size}
Ping: Pong!
Uptime: ${properuptime}`)
    msg.channel.send(stats).then(m => {
let ping = new Date().getTime() - msg.createdTimestamp
console.log(ping)
if (ping < 0) ping = bot.ws.ping
m.edit(new Discord.MessageEmbed().setTitle("Bot stats").setColor(0xB09000).setDescription(`[GitHub repo](https://github.com/ActuallyTheSun/numberbot)
Servers: ${bot.guilds.cache.size}
Ping: ${ping} ms
Uptime: ${properuptime}`))
})
  }
}