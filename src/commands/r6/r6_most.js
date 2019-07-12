const commando = require("discord.js-commando");
const discord = require("discord.js");
const r6api = require('r6api.js');

class R6MostCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "r6most",
      group: "r6",
      memberName: "r6_most",
      description: "Shows which character you played most!"
    });
  }

  async run(message, args) {

    let r6 = new r6api('redrocktemp@nextemail.in','Qlalfqjsgh!2345')

    let userName = args;
    console.log(userName);

    let id = await r6.getId('uplay',userName)
    .then(el=>el[0].id);

    let stats = await r6.getStats('uplay', id)
    .then(el=>{
      let operators = el[0].pvp.operators;
      let mostPlayed = 0;
      let currentIndex = 0;
      for(let i in operators){
        if(operators[i].playtime > mostPlayed){
          currentIndex = i;
          mostPlayed = operators[i].playtime;
          console.log(operators[i].name);
        }
      }

      mostPlayed = operators[currentIndex];
      return mostPlayed;
    });
    
    var myInfo = new discord.RichEmbed()
      .setTitle(userName)
      .addField("지금까지 가장 많이 한 캐릭터는?", stats.name, false)
      .addField("소속은?", stats.ctu, true)
      .addField("W/L",stats.wins + '/' + stats.losses, true)
      .addField("K/D", stats.kills + '/' + stats.deaths, true)
      .addField("플레이한 시간은 ?", (stats.playtime / 1440).toFixed(2) , false )
      .setDescription("랭크와 관련된 정보는 차차 업데이트 하도록하죠 (^ㅁ^)")
      .setColor("#6e6e6e")
      .setThumbnail(stats.badge)
      

    message.channel.sendEmbed(myInfo);
   
  }
}

module.exports = R6MostCommand;
