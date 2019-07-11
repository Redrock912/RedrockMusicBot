const commando = require("discord.js-commando");
const discord = require("discord.js");

class InfoSelfCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "info",
      group: "simple",
      memberName: "info",
      description: "Learn about me (RedrockBot)"
    });
  }

  async run(message, args) {
    var myInfo = new discord.RichEmbed()
      .setTitle("[만든 이의 링크]")
      .addField("저에 대해서", "Hello, I'm RedrockMusic", true)
      .addField("쓸데없는 정보 란", "왜 이걸 읽고 계시죠? ㅎㅅㅎ", true)
      .setDescription("안녕 난 RedrockMusic이야 (^ㅁ^)")
      .setColor("#DC143C")
      .setThumbnail(message.author.avatarURL)
      .setURL("https://www.twitch.tv/redrock912")
      .setFooter("읽어줘서 고마워요. :D");

    message.channel.sendEmbed(myInfo);
   
  }
}

module.exports = InfoSelfCommand;
