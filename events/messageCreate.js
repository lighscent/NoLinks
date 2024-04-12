const djs = require('discord.js');
const log = require('../logger');
const db = require('../db.js');
const { cli } = require('winston/lib/winston/config/index.js');

module.exports = {
    name: djs.Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        const client = message.client;

        const guild = message.guild;
        const rowGuilds = await db.query(`SELECT * FROM guilds WHERE id = ?`, [guild.id]);
        const rowDefault = await db.query(`SELECT * FROM default_config`);

        // add +1 to the stats table and bot table for the message count
        await db.query(`UPDATE stats SET msg_count = msg_count + 1 WHERE id = ?`, [guild.id]);
        await db.query(`UPDATE bot SET msg_count = msg_count + 1 WHERE id = ?`, [message.client.user.id]);


        if (rowGuilds[0].module_nolinks === 1) {
            const links = rowDefault[0].links;
            const content = message.content;

            const logChannel = client.channels.cache.get(rowGuilds[0].channel_logs);

            for (let link of links) {
                if (content.includes(link)) {
                    await message.delete();
                    // add +1 to the stats table and bot table for the deleted links deleted_msg_count
                    await db.query(`UPDATE stats SET deleted_msg_count = deleted_msg_count + 1 WHERE id = ?`, [guild.id]);
                    await db.query(`UPDATE bot SET deleted_msg_count = deleted_msg_count + 1 WHERE id = ?`, [message.client.user.id]);
                    log.cmd(`Deleted link ${link} in ${guild.id}`);
                    await message.channel.send(`Nice try, but you can't send links here!`).then(msg => { setTimeout(() => msg.delete(), 5000) });
                    logChannel.send(`Link \`${message.content}\` deleted in ${guild.id} sent by ${message.author.id}`);
                }
            }
        }
    }
}