const djs = require('discord.js');
const log = require('../logger');
const db = require('../db.js');

module.exports = {
    name: djs.Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;

        const guild = message.guild;
        const rowGuilds = await db.query(`SELECT * FROM guilds WHERE id = ?`, [guild.id]);
        const rowDefault = await db.query(`SELECT * FROM default_config`);


        if (rowGuilds[0].module_nolinks === 1) {
            const links = rowDefault[0].links;
            const content = message.content;

            for (let link of links) {
                if (content.includes(link)) {
                    await message.delete();
                    log.cmd(`Deleted link ${link} in ${guild.id}`);
                    return message.channel.send(`Link ${link} deleted by the NoLinks module`);
                }
            }
        }
    }
}