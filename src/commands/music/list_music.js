const commando = require("discord.js-commando");


class ListMusicCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "list",
      group: "music",
      memberName: "list",
      description: "shows the list of musics in the queue"
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

    return message.channel.send(`__**Music List:**__
    ${serverQueue.songs.map(song=> `**-** ${song.title}`).join('\n')}
    `)
  }
}

module.exports = ListMusicCommand;
