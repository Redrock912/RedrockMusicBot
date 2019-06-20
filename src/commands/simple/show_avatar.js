const commando = require("discord.js-commando");

class ShowAvatarCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "show",
      group: "simple",
      memberName: "show",
      description: "Shows yourself"
    });
  }

  async run(message, args) {
    message.reply(message.author.avatarURL);
  }
}

module.exports = ShowAvatarCommand;
