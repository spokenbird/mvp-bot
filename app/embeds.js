const Discord = require('discord.js');

const helpEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Hello, I am mvp-bot, here are my commands!')
    .addFields(
        { name: '!help', value: 'Lists all of the commands available.' },
        { name: '!timer', value: 'Example:\n' +
                '!timer "RSX" 16:56"\n' +
                '\n' +
                'Sending a message with the format:\n' +
                '[!timer] ["MVP Name"] [Time of of death] [Optional screenshot of the Tomb]\n' +
                '\n' +
                'Sets a timer for the specific MVP. Common nick names or abbreviations like "Moonie" and "RSX" are allowed. ' +
                'Note that the time of death is in server time, so you want to use the time on the tomb. \n' +
                '\n' +
                'I will remind you 15 minutes before and again 5 minutes before the MVPs spawn window.'}
    )

module.exports = { helpEmbed };