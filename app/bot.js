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
        const userInputTime = command.args[1];
        const isSpelledCorrectly = dictionary.spellCheck(userInputMvp)
        if (isSpelledCorrectly) {
            const mvpInfo = Bot.getMvpByName(userInputMvp);
            const mvpRespawnTime = moment.utc(userInputTime, "HH:mm a").add(mvpInfo.minSpawn, "minutes").format("HH:mm a");
            console.log("respawn time is ", mvpRespawnTime);
            return `${mvpInfo.names[0]} will respawn at ${mvpRespawnTime} PST. I will remind you 10 minutes before ${mvpInfo.names[0]} respawns.`;
        } else {
            const suggestionFromDict = dictionary.getSuggestions(userInputMvp, 1, 2)[0];
            const suggestions = Bot.getMvpByName(suggestionFromDict).names
            let response = `I don't have an MVP with that name, did you mean \`${suggestions[0]}?\``;
            let youCanAlsoSay = " You can also say";

            if (suggestions.length > 1) {
                for (let i = 1; i < suggestions.length; i++) {
                    if (i === suggestions.length - 1) {
                        youCanAlsoSay = youCanAlsoSay.concat(`or \`${suggestions[i]}\``);
                    } else if (i === 1) {
                        youCanAlsoSay = youCanAlsoSay.concat(` \`${suggestions[i]}\``);
                    } else {
                        youCanAlsoSay = youCanAlsoSay.concat(`, \`${suggestions[i]}\``);
                    }
                }
            }

            return response + youCanAlsoSay + ".";
        }
    }

    static getMvpByName(mvpName) {
        for (const mvp in mvps) {
            const mvpInfo = mvps[mvp];
            for (const name of mvpInfo.names) {
                if (name.toLowerCase() === mvpName.toLowerCase()) return mvpInfo;
            }
        }
    }
}

module.exports = Bot;