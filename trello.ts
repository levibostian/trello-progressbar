import { trelloApiKey, trelloWebhookCallbackURL } from "./env.ts";

export const updateCardProgressBar = async (args: { cardId: string, trelloToken: string }): Promise<boolean> => {
  const { cardId, trelloToken } = args;

  const card = await getCard(cardId, trelloToken);
  if (!card) return false;

  if (card.due === null || card.start === null) {    
    return false 
  }

  // "due": "2023-12-08T12:52:00.000Z",
  // "start": "2023-11-24T14:00:00.000Z",
  const dueDate = new Date(card.due); 
  const startDate = new Date(card.start);
  const now = new Date();

  const daysDoneThusFar = Math.round((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));          
  const daysBetweenDueDateAndStartDate = Math.round((dueDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)); 
  const daysRemaining = daysBetweenDueDateAndStartDate - daysDoneThusFar;

  const progressPercentage = Math.round((daysDoneThusFar / daysBetweenDueDateAndStartDate) * 100); 

  let originalTitle = card.name;

  // https://regexr.com/7o5o0
  originalTitle = originalTitle.replace(/\s*- \d+ days, \d+%/, "") // remove old progress bar if it exists

  const newTitle = `${originalTitle} - ${daysRemaining} days, ${progressPercentage}%`;

  const response = await fetch(new Request(`https://api.trello.com/1/cards/${cardId}?key=${trelloApiKey}&token=${trelloToken}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: newTitle
    })
  }));

  return response.ok;
}

// TODO
// https://developer.atlassian.com/cloud/trello/guides/rest-api/webhooks/#webhook-signatures
export const verifyWebhookRequestFromTrello = async (request: Request): Promise<boolean> => {
  return true 

  // const callbackUrl = request.url

  // const content = JSON.stringify(request.body) + callbackUrl;

  // const doubleHash = crypto.createHmac("sha1", secret).update(content).digest("base64");
  // var headerHash = request.headers["x-trello-webhook"];
  // return doubleHash == headerHash;
}

export const handleWebhookCallback = async (request: Request): Promise<void> => {  
  // if (!await verifyWebhookRequestFromTrello(request)) return 

  // const body = await request.json() as TrelloWebhook

  // if (body.action.type !== "updateCard") return 

  // const trelloCard = await db.getCard(body.model.id)
  // if (!trelloCard) return

  // await db.updateCard(...) // update the title, start, and due date in the database
  // await updateCardProgressBar({cardId: trelloCard.id, trelloToken: trelloCard.trelloToken})  
}

export const registerWebhook = async (args: { cardId: string, trelloToken: string }): Promise<boolean> => {
  const response = await fetch(new Request(`https://api.trello.com/1/webhooks/?callbackURL=${trelloWebhookCallbackURL}&idModel=${args.cardId}&key=${Deno.env.get("TRELLO_API_KEY")}&token=${args.trelloToken}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json'
    }
  }))

  return response.ok
}

const getCard = async(cardId: string, trelloToken: string): Promise<TrelloCard | undefined> => {
  const response = await fetch(new Request(`https://api.trello.com/1/cards/${cardId}?key=${trelloApiKey}&token=${trelloToken}&fields=start,due,name`, {
    method: "GET",
    headers: {
      'Accept': 'application/json'
    }
  }))

  if (!response.ok) return undefined

  return await response.json()
}

interface TrelloCard {
  start: string | null
  due: string | null  
  name: string
}

interface TrelloWebhook {
  action: {
    type: "updateCard" | string // the action that occurred 
  },
  model: {
    id: string // what will represent the cardid 
  }
}