const commando = require("discord.js-commando");

class NewTeamCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "new_team",
      group: "team",
      memberName: "new_team",
      description: "creates a new team"
    });
  }

  async run(message, args) {
    currentTeamMembers = [];
    message.reply("팀 정보를 초기화 시켰습니다 @_@ ");
  }
}

module.exports = NewTeamCommand;
