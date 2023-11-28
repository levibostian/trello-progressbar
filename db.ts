const kv = await Deno.openKv();

export const addCard = async(cardId: string, trelloToken: string): Promise<void> => {
  const existingCards = await getCards(trelloToken)
  const cards = new Set(existingCards)
  cards.add(cardId)  

  await kv.set(["cards", trelloToken], cards);
}

export const getCards = async(trelloToken: string): Promise<string[]> => {
  const cardsDbEntry = await kv.get(["cards", trelloToken])
  const cards = cardsDbEntry.value as string[] | null

  if (cards === null) return []

  return cards
}

export const deleteCard = async(cardId: string, trelloToken: string): Promise<void> => {
  let cards = await getCards(trelloToken)
  cards = cards.splice(cards.indexOf(cardId), 1) // removes the cardId from the array

  await kv.set(["cards", trelloToken], cards);  
}