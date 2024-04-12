const djs = require('discord.js');
const log = require('../../logger');
const db = require('../../db.js');

module.exports = {
    data: new djs.SlashCommandBuilder()
        .setName('config')
        .setDescription('Shows the bot config')
        .setDefaultMemberPermissions(djs.PermissionFlagsBits.ManageMessages)
        .addSubcommand(subcommand => subcommand.setName('module').setDescription('Activate or deactivate a module')
            .addStringOption(option => option.setName('modules').setDescription('Module to activate or deactivate').setRequired(true).addChoices({ name: 'NoLinks', value: 'nolinks' })))
        .addSubcommand(subcommand => subcommand.setName('channel').setDescription('Set the logs channel')
            .addStringOption(option => option.setName('channels').setDescription('Channel to set').setRequired(true).setRequired(true).addChoices({ name: 'Logs', value: 'logs' }))
            .addChannelOption(option => option.setName('channel').setDescription('Channel to set').setRequired(true))),

    async execute(client, interaction) {
        const guild = interaction.guild;

        const modules = interaction.options.getString('modules');
        const channels = interaction.options.getString('channels');

        if (interaction.options.getSubcommand() === 'module') {
            if (modules === 'nolinks') {
                const row = await db.query(`SELECT * FROM guilds WHERE id = ?`, [guild.id]);
                const module = row[0].module_nolinks;

                if (module) {
                    await db.query(`UPDATE guilds SET module_nolinks = ? WHERE id = ?`, [0, guild.id]);
                    log.cmd(`Module NoLinks disabled in ${guild.id} by ${interaction.user.id}`);
                    await interaction.reply({ content: `❌ Module NoLinks disabled`, ephemeral: true });
                } else {
                    await db.query(`UPDATE guilds SET module_nolinks = ? WHERE id = ?`, [1, guild.id]);
                    log.cmd(`Module NoLinks enabled in ${guild.id} by ${interaction.user.id}`);
                    await interaction.reply({ content: `✅ Module NoLinks enabled`, ephemeral: true });
                }
            }
        }

        if (interaction.options.getSubcommand() === 'channel') {
            if (channels === 'logs') {
                const channel = interaction.options.getChannel('channel');
                await db.query(`UPDATE guilds SET channel_logs = ? WHERE id = ?`, [channel.id, guild.id]);
                log.cmd(`Logs channel set in ${guild.id} by ${interaction.user.id}`);
                await interaction.reply({ content: `✅ Logs channel set to <#${channel.id}>`, ephemeral: true });
            }
        }
    }
}