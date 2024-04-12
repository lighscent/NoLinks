const djs = require('discord.js');

const client = new djs.Client({
    intents: [
        djs.GatewayIntentBits.Guilds,
        djs.GatewayIntentBits.GuildInvites,
        djs.GatewayIntentBits.GuildMembers,
        djs.GatewayIntentBits.GuildMessages,
        djs.GatewayIntentBits.GuildPresences,
        djs.GatewayIntentBits.MessageContent
    ],
    shards: 'auto',
    partials: [
        djs.Partials.Message,
        djs.Partials.GuildMember,
        djs.Partials.User,
        djs.Partials.Channel,
        djs.Partials.Guild,
    ],
});

module.exports = client;