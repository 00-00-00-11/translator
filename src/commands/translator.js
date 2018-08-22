const languageDetect = new (require('languagedetect'));
let { languages }    = require('country-data');

exports.run = (client, msg, args) => {
	languages = Object.values(languages);

	let guild = client.guildsConfig.get(msg.guild.id);

	if (!args[0]) return;

	if (['add', 'a'].includes(args[0])) {
		if (!args[2]) return msg.channel.send(client.normalEmbed(':x: **Correct Syntax:** `t.translator (a)dd <channel-name> <language>`'));

		let channel = msg.guild.channels.find(channel => channel.name.includes(args[1]) && channel.type == 'text');
		if (!channel) return msg.channel.send(client.normalEmbed(':exclamation: Channel not found!'));
		if (guild.channels.find(channelConfig => channelConfig.id == channel.id)) return msg.channel.send(client.normalEmbed(':exclamation: That channel has already been set, if you wanna modify use `t.translator modify <channel-name> <language>`'));
	
		let languagesDetectable = languageDetect.getLanguages();
		let languagesCodes = languages.filter(country => country.name && languagesDetectable.includes(country.name.toLowerCase()));

		let language = languagesCodes.find(country => country.name.toLowerCase() == args[2]);
		if (!language) return msg.channel.send(client.normalEmbed(':exclamation: Language not found!'));

		let channels = guild.channels;
		channels.push({id: channel.id, languageCode: language.alpha2});

		client.guildsConfig.setProp(msg.guild.id, channels, 'channels');

		msg.channel.send(client.normalEmbed(`:white_check_mark: Configured \`${channel.name}\` channel messages that are not \`${language.name}\` be translated to \`${language.name}\``));
	} else if (['remove', 'r'].includes(args[0])) {
		if (!args[2]) return msg.channel.send(client.normalEmbed(':x: **Correct Syntax:** `t.translator (r)emove <channel-name> <language>`'));

		let channel = msg.guild.channels.find(channel => channel.name.includes(args[1]) && channel.type == 'text');
		if (!channel) return msg.channel.send(client.normalEmbed(':exclamation: Channel not found!'));
		if (!guild.channels.find(channelConfig => channelConfig.id == channel.id)) return msg.channel.send(client.normalEmbed(':exclamation: That channel isn\'t set'));

		let channels = guild.channels;
		let channelIndex = channels.indexOf(guild.channels.find(channelConfig => channelConfig.id == channel.id));

		channels.splice(channelIndex, 1);

		client.guildsConfig.setProp(msg.guild.id, channels, 'channels');

		msg.channel.send(client.normalEmbed(`:white_check_mark: Removed \`${channel.name}\` from translating channels`));
	} else if (['modify', 'm'].includes(args[0])) {
		if (!args[2]) return msg.channel.send(client.normalEmbed(':x: **Correct Syntax:** `t.translator (m)odify <channel-name> <language>`'));

		let channel = msg.guild.channels.find(channel => channel.name.includes(args[1]) && channel.type == 'text');
		if (!channel) return msg.channel.send(client.normalEmbed(':exclamation: Channel not found!'));
		if (!guild.channels.find(channelConfig => channelConfig.id == channel.id)) return msg.channel.send(client.normalEmbed(':exclamation: That channel isn\'t set.'));
	
		let languagesDetectable = languageDetect.getLanguages();
		let languagesCodes = languages.filter(country => country.name && languagesDetectable.includes(country.name.toLowerCase()));

		let language = languagesCodes.find(country => country.name.toLowerCase() == args[2]);
		if (!language) return msg.channel.send(client.normalEmbed(':exclamation: Language not found!'));

		let channels = guild.channels;
		let channelIndex = guild.channels.indexOf(guild.channels.find(channelConfig => channelConfig.id == channel.id));
		channels[channelIndex] = {id: channel.id, languageCode: language.alpha2};

		client.guildsConfig.setProp(msg.guild.id, channels, 'channels');

		msg.channel.send(client.normalEmbed(`:white_check_mark: Configured \`${channel.name}\` channel messages that are not \`${language.name}\` be translated to \`${language.name}\``));
	}
}