const Discord = require("discord.js")
const fs = require("fs")
const bot = new Discord.Client({ ws: { intents: Discord.Intents.NON_PRIVILEDGED }})
bot.commands = new Discord.Collection()
let prefix = "nr!"
const config = require("./config.json")

//loads the commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

//when the bot logs on
bot.on("ready", () => {
  console.log(`${bot.user.tag}, ${bot.user.id}`)
  bot.user
    .setActivity(`with numbers | nr!help`, {
      type: "PLAYING"
    })
    .catch(console.error);
})

//all the maps for gtn
let gtn = new Map()
let maxnr = new Map()
let endtime = new Map()

//guess the number handler
bot.on("message", msg => {
	if (msg.channel.type === "dm") return;
	if (gtn.get(msg.channel.id)) {
		if ((Date.now() / 1000 | 0) > endtime.get(msg.channel.id)) {
			msg.channel.send("Time\'s up! number was " + gtn.get(msg.channel.id))
			gtn.delete(msg.channel.id)
			maxnr.delete(msg.channel.id)
			endtime.delete(msg.channel.id)
			msg.channel.overwritePermissions([{id: msg.guild.id, deny: ['SEND_MESSAGES']}])
			return
		}
		if (Number(msg.content) > maxnr.get(msg.channel.id)) {
			msg.delete({ reason: "Invalid number" })
			msg.author.send(`The number in **${msg.guild.name}** is between 1 and ${maxnr.get(msg.channel.id)}`).catch(e => {console.log(e)})
			return
		}
		if (!msg.content.match("^[0-9]+$")) {
			if (msg.author.id == bot.user.id) return
			msg.delete({ reason: "Not a number" })
			msg.author.send(`The number in **${msg.guild.name}** is between 1 and ${maxnr.get(msg.channel.id)}`).catch(e => {console.log(e)})
			return
		}
		if (gtn.get(msg.channel.id) == msg.content) {
			msg.reply(`You guessed the number! It was **${gtn.get(msg.channel.id)}**`)
			gtn.delete(msg.channel.id)
			maxnr.delete(msg.channel.id)
			endtime.delete(msg.channel.id)
			msg.channel.overwritePermissions([{id: msg.guild.id, deny: ['SEND_MESSAGES']}])
		}
	}
})

//counting handler
bot.on("message", msg => {
	if (msg.channel.type === "dm") return;
	let channel = JSON.parse(fs.readFileSync("./counting/channel.json", "utf8"));
	let currentnr = JSON.parse(fs.readFileSync("./counting/currentnr.json", "utf8"));
	if (msg.channel.id == channel[msg.guild.id]) {
		const perms = ["SEND_MESSAGES", "MANAGE_MESSAGES", "MANAGE_CHANNELS"]
		if (perms.some(p => !msg.guild.me.permissions.has(p))) return msg.react("❗")
		if (msg.content != (Number(currentnr[msg.guild.id]) + 1)) return msg.delete()
		const nr = currentnr[msg.guild.id]
		currentnr[msg.guild.id] = nr + 1
		fs.writeFile("./counting/currentnr.json", JSON.stringify(currentnr), (err) => {
			if (err) console.log(err)
  	})
	}
})

//command handler
bot.on("message", msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
	if (!msg.content.startsWith(prefix)) return
  let args = msg.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
  try {
  	command.execute(bot, msg, args, gtn, maxnr, endtime);
  } catch (e) {
    msg.channel.send(new Discord.MessageEmbed().setColor("0xFF0000").setDescription(`\`\`\`js
${e}\`\`\``))
  }
})

//log into the bot
bot.login(config.token)