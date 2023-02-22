const axios = require('axios')
const cheerio = require('cheerio')
const jsdom = require("jsdom")


const getCards = async (username) => {
  let decks = []
  // Get the data
  const targetUrl = "https://tappedout.net/users/" + username;
  const pageResponse = await axios.get(targetUrl);

  const $ = cheerio.load(pageResponse.data);
    $("h4.name a").each((index, deck) => {
      decks.push({name: deck.attribs.title.replace('mtg decks -', ''), link: deck.attribs.href})
    })
      let deckDetails = []
      const deckUrl = "https://tappedout.net/mtg-decks/ghoulkeeper-redefined/";
      const deckResponse = await axios.get(deckUrl);
        const deck = cheerio.load(deckResponse.data);
        deck(".board-col > h3").each((index, boardTypes) => {
          deckDetails.push({type: boardTypes.children[0].data, cards: []});
        });

        for (var i = 0; i < deck(".boardlist").length; i++) {
          deck(".boardlist")
            .eq(i)
            .find(".member > a")
            .each((index, link) => {
              deckDetails[i].cards.push({
                quantity: parseInt(link.attribs["data-qty"]),
                name: link.attribs["data-name"],
                link:
                  "https://tappedout.net/mtg-card/" + link.attribs["data-slug"],
                description: "",
              });
            });
        }

        let cardDesc

        console.log(JSON.stringify(deckDetails))
};

getCards("eothica")