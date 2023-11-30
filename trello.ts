import { trelloApiKey, trelloWebhookCallbackURL } from "./env.ts";

export const updateCardProgressBar = async (args: { cardId: string, trelloToken: string }): Promise<boolean> => {
  const { cardId, trelloToken } = args;

  const card = await getCard(cardId, trelloToken);
  if (!card) return false;

  // TODO: create new title based on dates. 

  const newTitle = `${card.name} NEW!`;

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