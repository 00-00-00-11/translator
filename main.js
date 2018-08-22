// Packages
const Discord = require('discord.js');
const fs      = require('fs');
const Level   = require('enmap-level');
const Enmap   = require('enmap');
 
// Enmap Provider
const provider = new Level({ name: 'guilds' });

// Environment variables
require('dotenv').config();

// Discord Client
const client = new Discord.Client();

// Client variables
client.config = require('./config.json');
client.guildsConfig = new Enmap({ provider: provider });
client.normalEmbed = (text) => { return {embed: new Discord.RichEmbed().setColor(0xffde17).setDescription(text)} };

// Event handler
let events = fs.readdirSync('./src/events'); 
events.forEach(filename => {
	let eventName = filename.split('.')[0];
	let event = require(`./src/events/${filename}`);
	client.on(eventName, (...args) => event.run(client, ...args));
});

// Unhandled Rejections
process.on('unhandledRejection', console.error);

// Starts the bot
client.login(process.env.token);