const Discord = require('discord.js');
const Bot = require("./bot");
const { token } = require('../config.json');
const { helpEmbed } = require("./embeds");
const client = new Discord.Client();


client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', input => {
    const message = input.content;
    if (Bot.commandIsValid(message) && !input.author.bot) {
        const command = Bot.checkCommand(message);
        switch(command.commandPrefix) {
            case "timer":
                const response = Bot.setTimer(command)
                const hasImage = input.attachments.size > 0;
                if (!response.suggestionMessage) {
                    input.channel.send(response.respawnMessage);
                    async function wait() {
                        await Bot.sleep(response.waitTime);
                        input.channel.send(`${input.author} \n ${response.respawnReminderMessage}`);
                        if (hasImage) {
                            const image = input.attachments.array()[0].url;
                            input.channel.send(image);
                        }
                    }
                    wait();
                } else {
                    input.channel.send(response.suggestionMessage);
                }
                break;
            case "help":
                input.channel.send(helpEmbed);
                break;
            default:
                input.channel.send("I don't recognize the command you've given, try using !help.");
        }
    }
});

client.login(token);