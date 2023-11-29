import * as db from "../db.ts"

export const enableCard = async(request: Request): Promise<void> => {
  const requestBody = await request.json()
  const cardId: string = requestBody.cardId
  const trelloToken: string = requestBody.trelloToken

  await db.addCard(cardId, trelloToken)  

  //await trello.registerWebhook({cardId, trelloToken}) // TODO 
  //await trello.updateCardProgressBar({cardId, trelloToken}) // TODO 
}