require('dotenv').config()
const Discord = require('discord.js');
const CronJob = require('cron').CronJob;
const Bot = require("./bot");
const token = process.env.TOKEN;
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
                        let reminderDateTime = new Date(response.respawnReminderTime);
                        reminderDateTime.setSeconds(reminderDateTime.getSeconds());
                        const reminderJob = new CronJob(reminderDateTime, function() {
                            input.channel.send(`${input.author} \n ${response.respawnReminderMessage}`);
                            if (hasImage) {
                                const image = input.attachments.array()[0].url;
                                input.channel.send(image);
                            }
                        });
                        const dateTime = new Date();
                        console.log("current time is, ", dateTime);
                        console.log("The jobs run time is, ", reminderDateTime);
                        reminderJob.start();
                        console.log("is th job running? ", reminderJob.running);
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