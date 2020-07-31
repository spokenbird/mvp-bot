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
                Bot.setTimer(command);
                break;
            case "help":
                input.channel.send(helpEmbed);
                break;
            default:
                console.log("The command is ", Bot.checkCommand(message));
        }
    }
});

client.login(token);