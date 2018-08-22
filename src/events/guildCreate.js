exports.run = (client, guild) => {
	client.guildsConfig.set(guild.id, {prefix: client.dolphinOptions.prefix});
	client.user.setPresence({ game: { name: `@Translator help | ${client.guilds.size} guilds`, type: 0 } });
}