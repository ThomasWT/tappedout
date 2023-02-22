const axios = require('axios')
const cheerio = require('cheerio')

const getList = async (page, username) => {
    let userDecksUrl = await axios.get(`https://tappedout.net/users/${username}/mtg-decks${page ? `?&p=${page}&page=${page}` : ''}`);
    return cheerio.load(userDecksUrl.data);
}

const getData = async (username) => {
  let decks = []
  let userDecksUrl = await axios.get(`https://tappedout.net/users/${username}/mtg-decks`);
  let allDecks = cheerio.load(userDecksUrl.data);

  for(var i = 0; i< allDecks(".pagination:nth-child(1) li").length; i++) {
      let list = await getList(i, username);
      list(".name a").each((index, link) => {
              console.log(list(".contents > h5:nth-child(1) > a"));
        decks.push({
          link: link.attribs.href,
          name: list(".contents .deck-wide-header:nth-child(1) > a")[index].text,
        });
      })


  }
  console.log(decks)
}

const getCards = async (username) => {
  let decks = []
  // Get the data
  const userDecksUrl = await axios.get(`https://tappedout.net/users/${username}/mtg-decks`);
  const allDecks = cheerio.load(userDecksUrl.data);

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
                image: deck(".boardlist").eq(i).find(".member > span > a")[0]
                  .attribs["data-image"],
                link:
                  "https://tappedout.net/mtg-card/" + link.attribs["data-slug"],
                description: "",
                price: deck(".boardlist").eq(i).find(".member > span > a")[0]
                  .attribs["data-tcg-price"],
              });
            });
          
        }

      /*   console.log(JSON.stringify(deckDetails)) */
};

/* getCards("Licecolony"); */

getData("Licecolony")