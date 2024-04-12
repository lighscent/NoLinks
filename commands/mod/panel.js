const djs = require('discord.js');
const log = require('../../logger');
const db = require('../../db.js');

module.exports = {
    data: new djs.SlashCommandBuilder()
        .setName('panel')
        .setDescription('Shows the bot panel')
        .addSubcommand(subcommand => subcommand.setName('info').setDescription('Shows the bot panel'))
        .addSubcommand(subcommand => subcommand.setName('modules').setDescription('Shows the bot modules')),

    async execute(client, interaction) {
        const guild = interaction.guild;

        const row = await db.query(`SELECT * FROM guilds WHERE id = ?`, [guild.id]);

        if (interaction.options.getSubcommand() === 'info') {
            const embed = new djs.EmbedBuilder()
                .setTitle('Gestion Panel')
                .setDescription(`GuildId: ${guild.id}`)
                .setThumbnail(guild.iconURL())
                .addFields(
                    { name: `Module NoLinks`, value: `${row[0].module_nolinks ? '✅ Enabled' : '❌ Disabled'}` },
                    { name: `Channel Logs`, value: `${row[0].channel_logs ? `<#${row[0].channel_logs}>` : '❌ Not set'}` }
                )
                .setColor('#21A5CF')
                .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.options.getSubcommand() === 'modules') {
            
        }

    }
}