const { prefix } = require('../config.json');
const mvps = require('../mvps.json');
const moment = require('moment');
const spellCheck = require('simple-spellchecker');
const dictionary = spellCheck.getDictionarySync('mvpNames', './dict');


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
        if (isSpelledCorrectly) {
            for (const mvp in mvps) {
                const mvpInfo = mvps[mvp];
                for (const name of mvpInfo.names) {
                    if (name === userInputMvp) console.log(userInputMvp);
                }
            }
        } else {
            const suggestions = dictionary.getSuggestions(userInputMvp, 5, 2);
            let response = `I don't have an MVP with that name, did you mean ${suggestions[0]}?`
            if (suggestions.length > 1) {
                let prefix = " You can also say"
                for (let i = 1; i < suggestions.length; i++) {
                    prefix.concat(`${suggestions[i]}`);
                }
            }

            console.log(response.concat(prefix));
            return suggestions + prefix;
        }
    }
}

module.exports = Bot;