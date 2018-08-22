exports.run = (client, msg, args) => {
	msg.channel.send(client.normalEmbed(`:blush: Working and responding in \`${client.ping}ms\``));
}