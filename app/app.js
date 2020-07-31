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
        switch(Bot.checkCommand(message).commandPrefix) {
            case "timer":
                Bot.setTimer();
                break;
            case "help":
                input.channel.send(helpEmbed);
            default:
                console.log("The command is ", Bot.checkCommand(message));
        }
    }
});

client.login(token);