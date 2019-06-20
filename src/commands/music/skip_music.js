const commando = require("discord.js-commando");

class SkipMusicCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "skip",
      group: "music",
      memberName: "skip",
      description: "skips the song (Requester only!)"
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

    if(serverQueue.requester == message.author.username){
      serverQueue.connection.dispatcher.end();
      message.channel.send('스킵 성공했습니다!');
    }else{
      message.channel.send('본인이 신청한 곡만 스킵가능합니다 ^ㅁ^');
    }
  }
}

module.exports = SkipMusicCommand;
