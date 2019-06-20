const commando = require("discord.js-commando");

class VolumeMusicCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "v",
      group: "music",
      memberName: "volume",
      description: "Sets the volume by {value}"
    });
  }

  async run(message, args) {
    // is it in a connection?
    let serverQueue = server.get(message.guild.id);
    if(!message.member.voiceChannel){
        return message.channel.send("뮤직 명령은 음성채널안에서만 가능하다구여~");
    }
    if(!serverQueue){
      return message.channel.send('현재 노래가 없는거 같은데요?');

    }

    if(!args){
        return message.channel.send(`현재 볼륨은 ${serverQueue.volume}`);
    }

    serverQueue.connection.dispatcher.setVolumeLogarithmic(args /5);
    serverQueue.volume = args;
}
}

module.exports = VolumeMusicCommand;
