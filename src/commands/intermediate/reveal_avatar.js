const commando = require("discord.js-commando");

class RevealAvatarCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "reveal",
      group: "intermediate",
      memberName: "reveal",
      description: "Enlarges {user}'s avatar"
    });
  }

  // getUserFromMention(mention) {
  //   if (!mention) return;

  //   if (mention.startsWith("<@") && mention.endsWith(">")) {
  //     mention = mention.slice(2, -1);

  //     if (mention.startsWith("!")) {
  //       mention = mention.slice(1);
  //     }

  //     return this.client.users.get(mention);
  //   }
  // }

  async run(message, args) {
    //message.reply(message.author.avatarURL);

    if (args[0]) {
      if (!args[0]) return;

      // if (args[0].startsWith("<@") && args[0].endsWith(">")) {
      //   args[0] = args[0].slice(2, -1);

      //   if (args[0].startsWith("!")) {
      //     args[0] = args[0].slice(1);
      //   }
      // }

      const user = message.mentions.users.first() || message.author;

      if (!user) {
        return message.reply("혹시 보고 싶은 사람을 빼먹으신건 아닌가요? ^-^");
      }
      return message.channel.send(`${user}'s avatar: ${user.displayAvatarURL}`);
    }

    return message.channel.send(
      `${message.author.username}, your avatar: ${
        message.author.displayAvatarURL
      }`
    );
  }
}

module.exports = RevealAvatarCommand;
