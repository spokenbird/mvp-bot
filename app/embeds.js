const Discord = require('discord.js');

const helpEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Hello, I am mvp-bot, here are my commands!')
    .addFields(
        { name: '!help', value: 'Lists all of the commands available' },
        { name: '!timer', value: 'Sending a message with format [!timer] ["MVP Name"] [Time of of death on Tomb]' }

    )
    .addField('Inline field title', 'Some value here', true)
    .setImage('https://i.imgur.com/wSTFkRM.png')
    .setTimestamp()
    .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

module.exports = { helpEmbed };