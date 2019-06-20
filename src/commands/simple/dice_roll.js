const commando = require("discord.js-commando");

class DiceRollCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "주사위",
      group: "simple",
      memberName: "roll",
      description: "Rolls a 100 sided dice"
    });
  }

  async run(message, args) {
    var chance = Math.ceil(Math.random() * 100);

    message.channel.sendMessage(
      message.author +
        "이 주사위를 굴려 " +
        chance +
        "이(가) 나왔습니다. (1-100)"
    );
  }
}

module.exports = DiceRollCommand;
