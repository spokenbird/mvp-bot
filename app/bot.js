const { prefix } = require('../config.json');
const moment = require('moment');

class Bot {

    static commandIsValid(message) {
        if (message[0] === prefix) return true;
    }

    static checkCommand(message) {
        const args = message.toLowerCase().slice(prefix.length).trim().split(/ +/);
        const commandPrefix = args.shift().toLowerCase();
        const command = { commandPrefix, args };

        return command;
    }

    static setTimer() {
        return moment();
    }
}

module.exports = Bot;