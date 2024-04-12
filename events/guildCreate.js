const djs = require('discord.js');
const log = require('../logger');
const db = require('../db.js');

module.exports = {
    name: djs.Events.GuildCreate,
    async execute(guild) {
        try {
            const row = await db.query(`SELECT * FROM guilds WHERE id = ?`, [guild.id]);
            if (!row.length) {
                await db.query(`INSERT INTO guilds (id) VALUES (?)`, [guild.id]);
                log.db(`Added guild ${guild.id} to the table guilds`);
            }

            const rowStats = await db.query(`SELECT * FROM stats WHERE id = ?`, [guild.id]);
            if (!rowStats.length) {
                await db.query(`INSERT INTO stats (id) VALUES (?)`, [guild.id]);
                log.db(`Added guild ${guild.id} to the table stats`);
            }
        } catch (err) {
            log.error(err);
        }
    }
}