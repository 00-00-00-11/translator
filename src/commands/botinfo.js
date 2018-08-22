const { RichEmbed } = require('discord.js');
const Utils         = require('../../utils/utils.js');

exports.run = (client, msg, args) => {
	let links = [
		{name: 'Invite Me', url: 'https://discordapp.com/oauth2/authorize?client_id=481804466509840392&scope=bot'}
	];

	let linksText = links.map(link => `[${link.name}](${link.url})`);

	msg.channel.send({embed:
		new RichEmbed()
			.setAuthor('Translator Info', client.user.avatarURL)
			.setColor(0x800020)
			.setThumbnail(client.user.avatarURL)
			.addField(':gear: Version', client.config.version, true)
			.addField(':books: Library', 'Discord.js', true)
			.addField(':bank: Guilds', client.guilds.size, true)
			.addField(':busts_in_silhouette: Users', client.users.size, true)
			.addField(':bust_in_silhouette: Developer', 'xGrow#9806', true)
			.addField(':alarm_clock: Uptime', Utils.format(client.uptime / 1000), true)
			.addField(':star: Useful links', linksText.join('\n'))
	});
}
