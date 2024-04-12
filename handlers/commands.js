const fs = require('fs');
const path = require('path');
const log = require('../logger');
const djs = require('discord.js');
const client = require('../client');

client.commands = new djs.Collection();
const commands = []
const foldersPath = path.join(__dirname, '../commands');

fs.readdirSync(foldersPath).forEach(folder => {
    fs.readdirSync(`${foldersPath}/${folder}`).filter(file => file.endsWith('.js')).forEach(file => {
        const command = require(`${foldersPath}/${folder}/${file}`);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
            log.load(`Loaded command ${command.data.name}`);
        } else {
            log.error(`Failed to load command ${file}`);
        }
    });
});
log.info(`Loaded ${commands.length} slash commands`);

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

client.on(djs.Events.ClientReady, async (client) => {
    try {
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands }
        );
        log.info(`Successfully registered ${commands.length} slash commands to ${client.user.tag} on ${client.guilds.cache.size} guilds`);
    } catch (error) {
        log.error(error);
        // console.log(error);
    }
});