import * as db from '../db.ts'
import * as trello from "../trello.ts "

export const updateCards = async() => {
  const allCards = await db.getAllCards()

  allCards.forEach(async(cards, trelloToken) => { 
    for (const card of cards) {
      await trello.updateCardProgressBar({cardId: card.id, trelloToken})
    }
  })
}