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
        const args = Bot.splitArgs(message.slice(1));
        const commandPrefix = args.shift().toLowerCase();
        const command = { commandPrefix, args };

        return command;
    }

    static setTimer(command) {
        const userInputMvp = command.args[0];
        let userInputTime = command.args[1];
        const isSpelledCorrectly = dictionary.spellCheck(userInputMvp)
        if (isSpelledCorrectly) {
            const mvpInfo = Bot.getMvpByName(userInputMvp);
            const startTime = moment.utc(userInputTime, "HH:mm a").format("HH:mm a");
            const mvpRespawnTime = moment.utc(userInputTime, "HH:mm a").add(mvpInfo.minSpawn, "minutes").format("HH:mm a");
            const respawnReminderTime = moment.utc(userInputTime, "HH:mm a").add(mvpInfo.minSpawn, "minutes").subtract("10", "minutes").format("HH:mm a");
            const respawnMessage = `${mvpInfo.names[0]} will respawn at ${mvpRespawnTime} PST. I will remind you 10 minutes before ${mvpInfo.names[0]} respawns.`;
            const respawnReminderMessage = `${mvpInfo.names[0]} will respawn at ${mvpRespawnTime} PST.`;
            const waitTime = moment
                .duration(moment(respawnReminderTime, "HH:mm a")
                .diff(moment(startTime, "HH:mm a"))
                ).asMilliseconds();
            const response = { respawnMessage, respawnReminderMessage, respawnReminderTime, mvpInfo, waitTime };
            return response;
        } else {
            const suggestionFromDict = dictionary.getSuggestions(userInputMvp, 1, 2)[0];
            const suggestions = Bot.getMvpByName(suggestionFromDict).names
            let suggestionMessage = `I don't have an MVP with that name, did you mean \`${suggestions[0]}?\``;
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

            suggestionMessage = suggestionMessage + youCanAlsoSay + ".";
            const response = { suggestionMessage };
            return response;
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

    static sleep(timeInMiliSeconds) {
        return new Promise(resolve => setTimeout(resolve, timeInMiliSeconds));
    }

    static splitArgs(message) {
        const argsArr = [];
        let currentArg = [];
        let inQuotes = false;
        for (let i = 0; i < message.length; i++) {
            const char = message[i];
            if (char === '"') {
                inQuotes = !inQuotes;
                continue;
            }
            if (inQuotes) {
                currentArg.push(char);
            } else {
                if (char === " ") {
                    argsArr.push(currentArg.join(""));
                    currentArg = [];
                } else if (i === message.length - 1) {
                    currentArg.push(char);
                    argsArr.push(currentArg.join(""));
                    currentArg = [];
                } else {
                    currentArg.push(char);
                }
            }
        }

        return argsArr;
    }
}

module.exports = Bot;