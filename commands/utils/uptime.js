const djs = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new djs.SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Shows the bot uptime'),

    async execute(client, interaction) {
        const uptime = ms(client.uptime, { long: true });

        const embed = new djs.EmbedBuilder()
            .setTitle('Uptime')
            .setDescription(`I have been online for ${uptime}`)
            .setColor('#eec06b')
            .setFooter({ text: 'Made with ❤️ by azukiov'})
            .setTimestamp()

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}