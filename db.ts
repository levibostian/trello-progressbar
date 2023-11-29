const kv = await Deno.openKv();

export const addCard = async(cardId: string, trelloToken: string): Promise<void> => {
  let res = { ok: false };
  while (!res.ok) {
    const existingCardsRow = await kv.get(["cards", trelloToken])
    const existingCards = existingCardsRow.value as string[] | null
    const cards = existingCards ?? []
    if (cards?.includes(cardId)) return // card already exists in the database

    cards.push(cardId)

    // Attempt to commit the transaction. `res` returns an object with
    // `ok: false` if the transaction fails to commit due to a check failure
    res = await kv.atomic()
      .check(existingCardsRow) // Ensure the cards haven't changed since read
      .set(["cards", trelloToken], cards) 
      .commit();
  }
}

export const getCards = async(trelloToken: string): Promise<string[]> => {
  const cardsDbEntry = await kv.get(["cards", trelloToken])
  const cards = cardsDbEntry.value as string[] | null

  if (cards === null) return []

  return cards
}
