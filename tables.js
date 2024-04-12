const log = require('./logger');
const db = require('./db');

// create tables
db.getConnection()
    .then(conn => {
        conn.query(`CREATE TABLE IF NOT EXISTS guilds (
            id VARCHAR(20) PRIMARY KEY,
            module_nolinks BOOLEAN DEFAULT 0,
            channel_logs VARCHAR(20) DEFAULT NULL
        )`)
    })