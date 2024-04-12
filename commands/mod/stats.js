const djs = require('discord.js');
const db = require('../../db');
const log = require('../../logger');

module.exports = {
    data: new djs.SlashCommandBuilder()
        .setName('stats')
        .setDescription('Shows the stats')
        .addSubcommand(subcommand => subcommand.setName('guild').setDescription('Shows the guild stats'))
        .addSubcommand(subcommand => subcommand.setName('bot').setDescription('Shows the bot stats')),
    async execute(client, interaction) {
        const guild = interaction.guild;
        const rowGuilds = await db.query(`SELECT * FROM stats WHERE id = ?`, [guild.id]);

        if (interaction.options.getSubcommand() === 'guild') {
            const embed = new djs.EmbedBuilder()
                .setTitle('Guild Stats')
                .setDescription(`GuildId: ${guild.id}`)
                .addFields(
                    { name: 'Messages', value: `\`${rowGuilds[0].msg_count}\``, inline: true },
                    { name: 'Deleted messages', value: `\`${rowGuilds[0].deleted_msg_count}\``, inline: true }
                )
                .setColor('#21A5CF')
                .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.options.getSubcommand() === 'bot') {
            const rowBot = await db.query(`SELECT * FROM bot WHERE id = ?`, [client.user.id]);

            const embed = new djs.EmbedBuilder()
                .setTitle('Bot Stats')
                .setDescription(`BotId: ${client.user.id}`)
                .addFields(
                    { name: 'Messages', value: `\`${rowBot[0].msg_count}\``, inline: true },
                    { name: 'Deleted messages', value: `\`${rowBot[0].deleted_msg_count}\``, inline: true }
                )
                .setColor('#21A5CF')
                .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}