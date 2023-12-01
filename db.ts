const kv = await Deno.openKv();

interface CardSchema {
  id: string 
  start: string | null
  due: string | null
  title: string
}

export const addCard = async(cardId: string, trelloToken: string): Promise<void> => {
  let res = { ok: false };
  while (!res.ok) {
    const existingCardsRow = await kv.get(["cards", trelloToken])
    const existingCards = existingCardsRow.value as CardSchema[] | null
    const cards = existingCards ?? []
    if (cards?.findIndex(card => card.id === cardId) != -1) return // card already exists in the database

    cards.push({
      id: cardId,
      start: null,
      due: null,
      title: ""
    })

    // Attempt to commit the transaction. `res` returns an object with
    // `ok: false` if the transaction fails to commit due to a check failure
    res = await kv.atomic()
      .check(existingCardsRow) // Ensure the cards haven't changed since read
      .set(["cards", trelloToken], cards) 
      .commit();
  }
}

export const getCards = async(trelloToken: string): Promise<CardSchema[]> => {
  const cardsDbEntry = await kv.get(["cards", trelloToken])
  const cards = cardsDbEntry.value as CardSchema[] | null

  if (cards === null) return []

  return cards
}

type GetAllCardsResult = Map<string, CardSchema[]>
export const getAllCards = async(): Promise<GetAllCardsResult> => {
  const result: GetAllCardsResult = new Map()  

  const entries = kv.list({ prefix: ["cards"] });
  for await (const entry of entries) {
    result.set((entry.key as Array<string>).pop()!, entry.value as CardSchema[])
  }  

  return result
}