const fs = require('fs');

exports.run = async (client, msg) => {
	let args = msg.content.trim().split(/ +/g);

	if (!msg.guild) return;

	let guild = client.guildsConfig.get(msg.guild.id);
	let prefix = guild.prefix;

	if (msg.author.bot) return;

	if ( (!msg.content.startsWith(prefix) && args[0] !== `<@${client.user.id}>`) && guild.channels.find(channel => channel.id == msg.channel.id)) return require('../snippet/translator.js').run(client, msg);
	
	// Basic Command Handler
	let commandName = msg.content.startsWith(prefix) ? args[0].toLowerCase().slice(prefix.length) : args[1].toLowerCase();

	let filenames = await fs.readdirSync('./src/commands/');
	let commands = filenames.map(filename => filename.split('.')[0]);
	let commandPath = `../commands/${commandName}.js`;

	if (!commands.includes(commandName)) return;

	let command = require(commandPath);
	command.run(client, msg, args.slice(1));
}