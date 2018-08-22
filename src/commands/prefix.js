exports.run = (client, msg, args) => {
	let guild = client.guildConfig.get(msg.guild.id);

	let newPrefix = args[0];
	if (!newPrefix) return msg.channel.send(client.normalEmbed(`:bank: Guild Prefix: \`${guild.prefix}\``));

	if (!msg.member.hasPermission(8) || !msg.member.hasPermission(32)) return msg.channel.send(client.normalEmbed(':exclamation: You need to have `Administrator` or `Manage Server` permissions to execute this.'));
	if (newPrefix.length > 10) return msg.channel.send(client.normalEmbed(':exclamation: Your new prefix can\'t have more than 10 characters'));

	client.guildConfig.set(msg.guild.id, newPrefix, 'prefix');

	msg.channel.send(client.normalEmbed(`:white_check_mark: <@${msg.author.id}> changed the guild prefix to \`${guild.prefix}\``));
}