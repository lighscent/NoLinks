const fs = require('fs');
const client = require('../client');
const log = require('../logger');

fs.readdirSync('./events').filter(file => file.endsWith('.js')).forEach(file => {
    const event = require(`../events/${file}`);
    if ('name' in event && 'execute' in event) {
        client.on(event.name, (...args) => event.execute(...args, client));
        log.load(`Loaded event ${event.name}`);
    } else {
        log.error(`Failed to load event ${file}`);
    }
});

log.info(`Loaded ${fs.readdirSync('./events').length} events`);