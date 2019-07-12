const commando = require("discord.js-commando");

class ChampionOddsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "tft",
            group: "tft",
            memberName: "champion_odds",
            description: "Calculates odds for you to get the character"
        });
    }

    async run(message, args) {

        let oddsArray = new Array(new Array(10).fill(0), new Array(6).fill(0));
        oddsArray[2][1] = 1;
        oddsArray[3][1] = 0.65;
        oddsArray[3][2] = 0.3;
        oddsArray[3][3] = 0.05;
        oddsArray[4][1] = 0.5;
        oddsArray[4][2] = 0.35;
        oddsArray[4][3] = 0.15;
        oddsArray[5][1] = 0.37;
        oddsArray[5][2] = 0.35;
        oddsArray[5][3] = 0.25;
        oddsArray[5][4] = 0.03;
        oddsArray[6][1] = 0.245;
        oddsArray[6][2] = 0.35;
        oddsArray[6][3] = 0.3;
        oddsArray[6][4] = 0.1;
        oddsArray[6][5] = 0.005;
        oddsArray[7][1] = 0.2;
        oddsArray[7][2] = 0.3;
        oddsArray[7][3] = 0.33;
        oddsArray[7][4] = 0.15;
        oddsArray[7][5] = 0.02;
        oddsArray[8][1] = 0.15;
        oddsArray[8][2] = 0.25;
        oddsArray[8][3] = 0.35;
        oddsArray[8][4] = 0.2;
        oddsArray[8][5] = 0.05;
        oddsArray[9][1] = 0.1;
        oddsArray[9][2] = 0.15;
        oddsArray[9][3] = 0.35;
        oddsArray[9][4] = 0.3;
        oddsArray[9][5] = 0.1;



        if (args) {
            let split = args.split(" ");
            if (split.length != 3) {
                message.reply("숫자를 3개 입력해주시기 바랍니다. (현재 내 레벨) (찾고 싶은 챔피언의 레벨) (현재 필드에 나와있는 갯수)");
            } else {
                message.channel.send("이 값은 완벽한 값이 아닙니다. 같은 등급의 다른 유닛의 갯수가 미치는 영향이 배제되있습니다.");

                let odds = oddsArray[split[0]][split[1]];

                switch (split[1]) {
                    case 1:
                        odds *= (39-split[2])/39;
                        break;
                    case 2:
                            odds *= (26-split[2])/26;
                        break;
                    case 3:
                            odds *= (21-split[2])/21;
                        break;
                    case 4:
                            odds *= (13-split[2])/13;
                        break;
                    case 5:
                            odds *= (10-split[2])/10;
                        break;
                    default:
                        message.reply("범위안에 맞는 값을 넣어주세요");
                        break;
                }

                message.channel.send("나올 확률은 대략 " + odds*100 + " 입니다");

            }
        } else {
            message.reply("숫자를 3개 입력해주시기 바랍니다. (현재 내 레벨) (찾고 싶은 챔피언의 레벨) (현재 필드에 나와있는 갯수)");
        }

    }
}

module.exports = ChampionOddsCommand;
