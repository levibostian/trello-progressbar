import * as db from "../db.ts"
import * as trello from "../trello.ts"

export const enableCard = async(request: Request): Promise<void> => {
  const requestBody = await request.json()
  const cardId: string = requestBody.cardId
  const trelloToken: string = requestBody.trelloToken
  
  // Try to update card title, first. This makes the card title up-to-date but also 
  // validates with trello we have a valid token and cardid. We want to avoid 
  // saving invalid cardids to the database.
  const didSuccessfullyUpdate = await trello.updateCardProgressBar({cardId, trelloToken}) 
  
  if (!didSuccessfullyUpdate) {
    return
  }

  await trello.registerWebhook({cardId, trelloToken})
  await db.addCard(cardId, trelloToken)  
}