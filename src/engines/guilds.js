exports.run = (client) => {
	let guilds = client.guilds.keyArray();

	let guildConfig = client.config.guildConfig;

	guilds.forEach(guildID => {
		let guild = client.guildsConfig.get(guildID);
		if (!guild) return client.guildsConfig.set(guildID, guildConfig);
		
		let defaultKeys = Object.keys(guildConfig);
		let guildKeys = Object.keys(guild);

		if (guildKeys.length == defaultKeys.length) return;

		let search = defaultKeys.length > guildKeys.length ? {from: defaultKeys, to: guildKeys, method: 'add'} : {from: guildKeys, to: defaultKeys, method: 'delete'};
		let results = search.from.filter(key => search.to.indexOf(key) == -1);

		if (search.method == 'add') results.forEach(key => client.guildsConfig.setProp(guildID, key, guildConfig[key]));
		else results.forEach(key => client.guildsConfig.deleteProp(guildID, key));
	});
}