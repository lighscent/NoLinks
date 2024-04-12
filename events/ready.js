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
                wait(3000)
                require('../entry.js')
            } catch (err) {
                log.error(err);
            }

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