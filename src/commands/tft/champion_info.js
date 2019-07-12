const commando = require("discord.js-commando");
const fetch = require('node-fetch');
const discord = require('discord.js')


function getImageFromURL(url){
    fetch(url)
    .then(function(data){
        return data;
    })
}

class ChampionInfoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "tftchamp",
            group: "tft",
            memberName: "teamfight_champion",
            description: "Shows data about tft champion"
        });
    }

    async run(message, args) {
        
        let url = "https://solomid-resources.s3.amazonaws.com/blitz/tft/data/champions.json";
        

        if (args) {
            let imageUrl = "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + args + "_0.jpg";
            // let imageData = getImageFromURL(imageUrl);

            fetch(url)
                .then(res => res.json())
                .then((out) => {

                    
                    
                    let stats = out[args];
                    console.log(stats);
                    var myInfo = new discord.RichEmbed()
                        .setTitle(stats.name)
                        .setImage(imageUrl)
                        .addField("종족 값", stats.origin, true)
                        .addField("클래스", stats.class, true)
                        .addField("공격력" , stats.stats.offense.damage, true)
                        .addField("초당 공격 횟수" , stats.stats.offense.attackSpeed, true)
                        .addField("공격 범위" , stats.stats.offense.range, true)
                        .addField("체력" , stats.stats.defense.health, true)
                        .addField("방어력" , stats.stats.defense.armor, true)
                        .addField("마법 저항력" , stats.stats.defense.magicResist, true)
                        .addField("마나 소모량", stats.ability.manaCost, true)
                        .addField("초기 마나량", stats.ability.manaStart, true)
                        .setColor("#DC143C")
                        .setFooter("완전 노가다구만 ^ㅁ^");

                    message.channel.sendEmbed(myInfo);
                })
                .catch(err => {
                    message.reply("캐릭터 이름을 적으세요 (영문으로) You have to put in champion's name");
                    throw err;
                });


        } else {
            message.reply("캐릭터 이름을 적으세요 (영문으로) You have to put in champion's name");
        }


    }
}

module.exports = ChampionInfoCommand;
