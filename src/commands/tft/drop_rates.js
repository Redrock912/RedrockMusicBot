const commando = require("discord.js-commando");
const discord = require('discord.js');

class DropRatesCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "tftlevel",
      group: "tft",
      memberName: "level_droprates",
      description: "Shows droprates by level"
    });
  }

  async run(message, args) {
    let easyWay = "https://www.naguide.com/wp-content/uploads/2019/07/tft-champions-cheat-sheet-1.jpg"

    let dropInfo = new discord.RichEmbed()
    .setTitle("레벨 별 챔피언 나올 확률")
    .setImage(easyWay);

    message.channel.sendEmbed(dropInfo);
  }
}

module.exports = DropRatesCommand;
