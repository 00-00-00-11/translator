exports.run = (client, channel) => {
	let guild = client.guildsConfig.get(channel.guild.id);
	let channelConfig = guild.channels.find(channelConfig => channelConfig.id == channel.id);

	if (channel.type !== 'text' || !channelConfig) return;

	let channels = guild.channels;
	let channelIndex = channels.indexOf(channelConfig);

	channels.splice(channelIndex, 1);

	client.guildsConfig.set(channel.guild.id, channels, 'channels');
}