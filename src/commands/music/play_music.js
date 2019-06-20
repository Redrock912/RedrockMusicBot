const commando = require("discord.js-commando");
const YTDL = require("ytdl-core");

function Play(message, song) {


  const serverQueue = server.get(message.guild.id);

  
  if (!song) {
    serverQueue.voiceChannel.leave();
    server.delete(message.guild.id);
    return;
  }

  let dispatcher = serverQueue.connection.playStream(YTDL(song.url, {filter:'audioonly', quality:'highestaudio', highWaterMark:1<<25}),{highWaterMark:1})
    .on('end', () => {
      console.log('Song ended!');
      serverQueue.queue.shift();
      serverQueue.requester.shift();
      if (serverQueue) {
        Play(message, serverQueue.queue[0]);
      }
    })
    .on('error', error => {
      console.error(error);
    });

  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  
  serverQueue.textChannel.send(`Playing...: **${song.title}** `);
}

class PlayMusicCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "play",
      group: "music",
      memberName: "play",
      description: "Joins the voice channel of the commander"
    });
  }

  async run(message, args) {

    const serverQueue = server.get(message.guild.id);
    const voiceChannel = message.member.voiceChannel;

    if (!message.member.voiceChannel) {
      message.reply("CALL ME IN VOICE CHANNEL HUMAN");
    }

    let permissions = message.member.voiceChannel.permissionsFor(
      message.guild.me
    );

    if (!permissions.has("SPEAK")) {
      return message.channel.send("말을 할 수 없어요. 말할 수 있게 해주세요.");
    }


    const songInfo = await YTDL.getInfo(args);
    
    const song = {
      title: songInfo.title,
      url: songInfo.video_url
    }

    // 머기중인게 없다면 새로만들고
    if (!serverQueue) {
      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        requester: [],
        connection: null,
        queue: [],
        volume: 5,
        playing: true
      };


      server.set(message.guild.id, queueConstruct);

      queueConstruct.queue.push(song);
      // 누가 했는지도 저장해놓자!
      queueConstruct.requester.push(message.author.username);



      // variables

      message.channel.send("Voice connection Check!");
      message.channel.send(`${message.author.username}`);


      try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        Play(message, queueConstruct.queue[0]);
      } catch (err) {
        console.log(err);
        server.delete(message.guild.id);
        return message.channel.send(err);
      }


    } else {
      // 이미 한번 만들어봤다면
      
      serverQueue.queue.push(song);
      
      return message.channel.send(`${song.title} 추가했습니다!`);
    }


  }
}


module.exports = PlayMusicCommand;
