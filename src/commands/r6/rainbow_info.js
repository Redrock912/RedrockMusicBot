const commando = require("discord.js-commando");
const discord = require("discord.js");
const r6api = require('r6api.js');

class RainbowInfoCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "r6",
      group: "r6",
      memberName: "rainbow_info",
      description: "Shows r6Stats info! "
    });
  }

  async run(message, args) {

    let r6 = new r6api('redrocktemp@nextemail.in','Qlalfqjsgh!2345')

    let userName = args;
    console.log(userName);

    let id = await r6.getId('uplay',userName)
    .then(el=>el[0].id);

    let stats = await r6.getStats('uplay', id)
    .then(el=>el[0]);
    
    
    var myInfo = new discord.RichEmbed()
      .setTitle(userName)
      .addField("지금까지 플레이한 매치의 수 기억하시나요?", stats.pvp.general.matches, true)
      .addField("실수로 자신을 죽인 횟수", stats.pvp.general.suicides, true)
      .setDescription("랭크와 관련된 정보는 차차 업데이트 하도록하죠 (^ㅁ^)")
      .setColor("#DC143C")
      .setThumbnail(message.author.avatarURL)
      .setFooter("읽어줘서 고마워요. :D");

    message.channel.sendEmbed(myInfo);
   
  }
}

module.exports = RainbowInfoCommand;
