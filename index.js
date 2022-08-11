const Discord = require("discord.js");

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const keep_alive = require('./keep_alive.js')

//CONFİG
const config = {
  voicechannel: "",
  guildid: "",
  token: "",
}
//RUN
client.login(config.token);

client.on('reconnecting', () => {
  console.log(' :: Reconnecting!');
  client.user.setPresence({ status: "offline" });
});

client.on('disconnect', () => {
  console.log(' :: Disconnect!');
  client.user.setPresence({ status: "offline" });
});

client.on("ready", () => {
  console.log(`${client.user.tag} online`);
  radioexecuteadmin();

  setInterval(() => {

    check();
  }, 30000);
})

client.on('voiceStateUpdate', async (oldState, newState) => {
  try {
    if (newState.channel.id === config.voicechannel && newState.guild.id === config.guildid) {
      if (newState.member.id === client.user.id) return;
      if (newState.guild.me.speaking) return;
      if (newState.member.user.bot) return;
      radioexecuteadmin();
    }
  }
  catch{
  }
});
async function check() {
  let guild = client.guilds.cache.get(config.guildid);

  if (!guild.me.voice.channel) {
    radioexecuteadmin();
  }
}

async function radioexecuteadmin() {
  const voiceChannel = client.guilds.cache.get(config.guildid).channels.cache.get(config.voicechannel);
  voiceChannel.join()
    .then(cnc => {
      cnc.voice.setSelfDeaf(true);
      cnc.voice.setDeaf(true);
      ///RADİO
      cnc.play("https://listen.reyfm.de/lofi_320kbps.mp3") 
        .setVolumeLogarithmic(80 / 100) //volume 70%
    });
}
