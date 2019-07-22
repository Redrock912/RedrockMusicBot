const commando = require("discord.js-commando");
const discord = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

class MTGACardsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "magic",
            group: "mtga",
            memberName: "mtga_cards",
            description: "MTG 공식사이트에서 잘 막아놨네요 데이터 못 긁어가게 ㅎㅎ "
        });
    }

    async run(message, args) {
        let url = 'https://gatherer.wizards.com/Pages/Card/Details.aspx?'
        let name = '이성 도둑';
        let unicode = charToUnicode(name);
        let encoded = encodeURI(name);
        let resUrl;
        axios.get(url, {
            params: {
                name: encoded
            }
        }).then(response => {
            if (response.status == 200) {
                // const html = response.data;
                // resUrl = response.request.res.responseUrl;
                // console.log(response.request.res.responseUrl);
                axios.get(resUrl)
                    .then(response => console.log(response.data));
                //console.log(html);
                //console.log(encoded);
                const $ = cheerio.load(html);
            }
        }, error => console.log(error));




    }
}

charToUnicode = function (str) {
    if (!str) return false; // Escaping if not exist
    var unicode = '';
    for (var i = 0, l = str.length; i < l; i++) {
        unicode += '\\' + str[i].charCodeAt(0).toString(16);
    };
    return unicode;
}

module.exports = MTGACardsCommand;
