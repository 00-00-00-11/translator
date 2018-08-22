const { RichEmbed } = require('discord.js');

exports.run = (client, msg, args) => {
	if (client.config.ownerID !== msg.author.id) return;
	await msg.delete();
		  
	let evalMsg = args.join(' ');
		  
	try {
		msg.channel.send({embed:
			new RichEmbed()
				.setAuthor('Eval', client.user.avatarURL)
				.setColor(0x74f442)
				.addField(':inbox_tray: Input', '```' + evalMsg + '```')
				.addField(':outbox_tray: Output', '```' + eval(evalMsg) + '```')
		});
	} catch (err) {
		msg.channel.send({embed:
			new RichEmbed()
				.setAuthor('Eval', client.user.avatarURL)
				.setColor(0xff1900)
				.addField(':inbox_tray: Input', '```' + evalMsg + '```')
				.addField(':outbox_tray: Output', '```' + err.message + '```')
		});
	}
}