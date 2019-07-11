const commando = require("discord.js-commando");
const NinjaAPI = require("poe-ninja-api-manager");
const discord = require("discord.js");


function getItemLinkParameter(itemString){
    var matches = itemString.match(/\[(.*?)\]/);

    
    if (matches) {
        var submatch = matches[1];
    }else{
        var submatch = 0;
    }

    console.log(Number(submatch));
    return Number(submatch);
}

class SearchItemCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "item",
            group: "poe",
            memberName: "search",
            description: "POE 아이템 검색, 한글은 지원하는 데이터베이스가 찾기 쉽지않네연..."
        });
    }

    async run(message, args) {
        let ninjaAPI = new NinjaAPI({
            league: "Legion"
        });

        if (args) {


            ninjaAPI.update()
                .then((result) => {
                    console.log("Updated data!");
                    //return ninjaAPI.save();
                })
                .then((success) => {
                    console.log("데이터 저장 완료! ", success);
                    return ninjaAPI.getItem(args.split(' [')[0], { links: getItemLinkParameter(args) });
                })
                .then((item) => {
                    
                    let index = item.length-1;

                    var myInfo = new discord.RichEmbed()
                        .setTitle(item[index].name)
                        .addField("카오스 가격(가장 중요한 정보랄까?)", item[index].chaosValue, true)
                        .addField("대충 엑잘 가격", item[index].exaltedValue, true)
                       // .setDescription(item[0].flavourText)
                        .setColor("#DC143C")
                        .setThumbnail(item[index].icon)
                        .setFooter("닌자에서 가져온 최소가격 정보입니다 :D");

                    message.channel.sendEmbed(myInfo);

                    return console.log("asdf" + item);
                })
                .catch((err) => {
                    message.reply("제대로 입력했는지 확인해주세요 ㅠㅅ ㅠ");
                    message.channel.send("입력예시 : !item 이름(대소문자) [필요시에 소켓갯수 입력]");
                })
        }
    }
}

module.exports = SearchItemCommand;
