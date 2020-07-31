const { prefix } = require('../config.json');
const mvps = require('../mvps.json');
const moment = require('moment');
const spellCheck = require('simple-spellchecker');
const dictionary = spellCheck.getDictionarySync("mvpNames");

console.log(dictionary);

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

    static setTimer(command) {
        const userInputMvp = command.args[0].slice(1, -1);
        const isSpelledCorrectly = dictionary.spellCheck(userInputMvp)
        // if (isSpelledCorrectly) {
        //     for (const mvp in mvps) {
        //         const mvpInfo = mvps[mvp];
        //         for (const name of mvpInfo.names) {
        //             if (name === userInputMvp) console.log(userInputMvp);
        //         }
        //     }
        // } else {
        //     console.log(dictionary.getSuggestions(userInputMvp, 2, 2));
        // }
    }
}

module.exports = Bot;