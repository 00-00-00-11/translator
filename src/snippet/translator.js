const languageDetect = new (require('languagedetect'));
const translate      = require('google-translate-api');
let { languages }    = require('country-data');

exports.run = async (client, msg) => {

	let guild = client.guildsConfig.get(msg.guild.id);
	let channelConfig = guild.channels.find(channel => channel.id == msg.channel.id);
	
	let languageDetected = languageDetect.detect(msg.content, 1)[0];
	if (languageDetected == channelConfig.language) return;

	let languageCode = Object.values(languages).find(country => country.name && country.name.toLowerCase() == languageDetected);
 
	let result = await translate(msg.content, {from: languageCode, to: channelConfig.languageCode});
	if (result.text.length + msg.author.tag.length + 5 > 2000) return;

	msg.channel.send(`\`${msg.author.tag}\` » ${result.text}`);
}