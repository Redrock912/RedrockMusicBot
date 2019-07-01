const Commando = require("discord.js-commando");
const discord = require("discord.js");
const bot = new Commando.CommandoClient();
//var TOKEN = 'Kappa";
const http = require("http");

//bot.login(process.env.BOT_TOKEN);
bot.login(process.env.BOT_TOKEN);

bot.registry.registerGroup("simple", "Simple");
bot.registry.registerGroup("music", "Music");
bot.registry.registerGroup("team", "Team");
bot.registry.registerGroup("intermediate", "Intermediate");
bot.registry.registerGroup("fantasy", "Fantasy");
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

// 모든 곳에서 사용하기 위한 전역변수
global.currentTeamMembers = [];
global.server = new Map();

bot.on("message", function(message) {
  if (message.content === "여어") {
    //message.reply("히사시부리~");
    message.channel.sendMessage("히사시부리" + message.author + "... AYAYA");
  } else if (message.content === "팀알려줘") {
    var teamInfo = new discord.RichEmbed().setTitle("현재 팀");
    for (var i = 0; i < currentTeamMembers.length; i++) {
      teamInfo.addField(
        "팀 멤버: " + (i + 1).toString(),
        currentTeamMembers[i].username
      );
    }

    message.channel.send(teamInfo);
    //message.channel.send(currentTeamMembers);
  }

  if (message.content === "가입테스트") {
    message.member.send("어서오세요~");
    let memberRole = message.member.guild.roles.find(
      role => role.name === "초심자의 행운"
    );
    message.member.addRole(memberRole).catch(console.error);

    // message.member.guild
    //   .createRole({
    //     name: message.member.user.username,
    //     color: "#DC143C",
    //     permissions: []
    //   })
    //   .then(function(role) {
    //     message.member.addRole(role);
    //   });
  }
});

bot.on("ready", function() {
  console.log("Ready");
});
//create a server object:

bot.on("guildMemberAdd", function(member) {
  member.send("어서오세요~ ^ㅁ^");
  let memberRole = member.guild.roles.find(
    role => role.name === "초심자의 행운"
  );
  member.addRole(memberRole);
});

http
  .createServer(function(req, res) {
    res.write("Hello rd!"); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //
