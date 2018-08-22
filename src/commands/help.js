const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args) => {
	let commands = require('../../commands.json');
	let commandName = args[0] ? args[0].toLowerCase() : undefined;

	if (!commandName) {
		let commandsDescription = commands.map(command => `[\`t.${command.syntax}\`](https://google.com/) » ${command.description}`);

		await msg.author.send({embed:
			new RichEmbed()
				.setAuthor('Translator Help', client.user.avatarURL)
				.setColor(0xffde17)
				.setDescription(`Use \`t.help [command]\` for a command information!\n\n${commandsDescription.join('\n')}`)
				.setFooter('[] » Optional | <> » Required')
		});

		msg.channel.send(':mailbox_with_mail: Sent to your DM!');
	} else {
		let command = commands.find(command => command.name == commandName);
		if (!command) return msg.channel.send(client.normalEmbed(':exclamation: Command not found!'));

		let examples = command.examples.map(example => `**t.${example}**`)

		msg.channel.send({embed:
			new RichEmbed()
				.setAuthor(`How to use t.${command.name}`, client.user.avatarURL)
				.setColor(0xffde17)
				.addField(':speech_left: Description', command.description)
				.addField(':question: Syntax', command.syntax, true)
				.addField(':star: Examples', examples.join('\n'), true)
				.setFooter('[] » Optional | <> » Required')
		});
	}
}