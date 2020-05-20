const Discord = require('discord.js');
const bot = new Discord.Client();
const weather = require('weather-js');
const prefix = '!';

bot.on('message', message => {

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);

    if (msg === prefix + 'PING') {

      message.channel.send('Pong!');

    }

    if (msg.startsWith(prefix + 'WEATHER')) {
        weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
            if (err) message.channel.send(err);

            var current = result[0].current;
            var location = result[0].location;

            const embed = new Discord.MessageEmbed()
              .setDescription(`**${current.skytext}**`)
              .setAuthor(`Wetter für ${current.observationpoint}`)
              .setThumbnail(current.imageUrl)
              .setColor(0x00AE86)
              .addField('Zeitzone',`UTC${location.timezone}`, true)
              .addField('Temperatur Typ',location.degreetype, true)
              .addField('Temperatur', `${current.temperature} Grad`, true)
              .addField('Fühlt sich an wie', `${current.feelslike} Grad`, true)
              .addField('Wind',current.winddisplay, true)
              .addField('Luftfeuchtigkeit', `${current.humidity}%`, true)

              message.channel.send({embed});
        });
    }
});

bot.on('ready', () => {
    console.log('Bot wurde gestartet.')
});

bot.login('NzEyNzQ5OTUxMzIyNDIzMzc2.XsWMag.ir-ov01DJgEcVEgKll7QnBguSVk');
