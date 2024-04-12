const djs = require('discord.js');
const log = require('../logger');

module.exports = {
    name: djs.Events.InteractionCreate,
    async execute(interaction) {
        let client = interaction.client;

        try {
            if (!interaction.isChatInputCommand()) return;
            let command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                log.error(`Command ${interaction.commandName} not found.`);
                return interaction.reply({ content: `Command not found`, ephemeral: true });
            }

            await command.execute(client, interaction);
            log.cmd(`${interaction.user.id} used command ${interaction.commandName} in ${interaction.guild.id}`)
        } catch (error) {
            console.log(error);
            log.error(`Command ${interaction.commandName} failed to execute.`);
            interaction.reply({ content: `An error occurred while using the command\nPlease send a message to [support](https://discord.gg/zonedev)`, ephemeral: true });
        }
    }
}