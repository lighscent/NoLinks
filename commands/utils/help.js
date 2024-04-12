const djs = require('discord.js');
const log = require('../../logger');
const { data } = require('./uptime');

module.exports = {
    data: new djs.SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows the bot help'),
    async execute(client, interaction) {
        const embed = new djs.EmbedBuilder()
            .setTitle('How to use the bot?')
            .setDescription('This bot is a simple bot that allows you to delete all links in a channel. To use it, you must have the `MANAGE_MESSAGES` permission.')
            .setColor('#21A5CF')
            .addFields(
                { name: `/panel`, value: `Shows the bot panel` },
                { name: `/config`, value: `Configure the bot` }
            )
            .setTimestamp()
            .setThumbnail(`https://imgur.com/6CNUPnz.gif`)
            .setImage(`https://imgur.com/7MzZjtH.gif`)
            .setFooter({ text: 'Made with ❤️ by azukiov' });

        const button = new djs.ButtonBuilder()
            .setStyle(djs.ButtonStyle.Link)
            .setLabel('Support server')
            .setURL('https://discord.gg/zoneDev');

        const row = new djs.ActionRowBuilder()
            .addComponents(button);

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }
}