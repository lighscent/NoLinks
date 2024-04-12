const djs = require('discord.js');
const log = require('../logger');
const db = require('../db.js');
const package = require('../package.json');
const wait = require('util').promisify(setTimeout);

module.exports = {
    name: djs.Events.ClientReady,
    once: true,
    execute(client) {
        try {
            try {
                require('../tables.js')
            } catch (err) {
                log.error(err);
            }

            // add for table bot with the bot id
            db.query(`SELECT * FROM bot WHERE id = ?`, [client.user.id]).then(row => {
                if (!row.length) {
                    db.query(`INSERT INTO bot (id) VALUES (?)`, [client.user.id]);
                    log.db(`Added bot ${client.user.id} to the table bot`);
                }
            });

            client.guilds.cache.forEach(async guild => {
                const row = await db.query(`SELECT * FROM guilds WHERE id = ?`, [guild.id]);
                if (!row.length) {
                    await db.query(`INSERT INTO guilds (id) VALUES (?)`, [guild.id]);
                    log.db(`Added guild ${guild.id} to the table guilds`);
                }
            });

            client.guilds.cache.forEach(async guild => {
                const row = await db.query(`SELECT * FROM stats WHERE id = ?`, [guild.id]);
                if (!row.length) {
                    await db.query(`INSERT INTO stats (id) VALUES (?)`, [guild.id]);
                    log.db(`Added guild ${guild.id} to the table stats`);
                }
            });


            const status = [
                () => `delete all links`,
                () => `discord.gg/azukiov`,
                () => `Eazy config`,
                () => `version ${package.version}`,
            ]
            let i = 0;
            setInterval(() => {
                client.user.setActivity(status[i](), { type: djs.ActivityType.Watching });
                i = ++i % status.length;
            }, 5e3);
        } catch (err) {
            log.error(err);
        }
    }
}