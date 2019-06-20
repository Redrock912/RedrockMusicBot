const commando = require("discord.js-commando");

class LeaveChannelCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "leave",
      group: "music",
      memberName: "leave",
      description: "leaves the voice channel of the commander"
    });
  }

  async run(message, args) {
    // is it in a connection?
    if (message.guild.voiceConnection) {
      message.guild.voiceConnection.disconnect();
    } else {
      message.reply("I'M NOT IN A VOICE CHANNEL");
    }
  }
}

module.exports = LeaveChannelCommand;
