exports.run = (client, guild) => {
	client.guildsConfig.delete(guild.id);
	client.user.setPresence({ game: { name: `@Translator help | ${client.guilds.size} guilds`, type: 0 } });
}