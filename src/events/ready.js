const fs = require('fs');

exports.run = (client) => {
	console.log(`Translator is now online running on ${client.guilds.size} guilds | ${client.config.version}`);

	client.user.setPresence({ game: { name: `@Translator help | ${client.guilds.size} guilds`, type: 0 } });

	let engines = fs.readdirSync('./src/engines');
	engines.forEach(filename => {
		let engine = require(`../engines/${filename}`);
		engine.run(client);
	});
}