export const trelloApiKey = Deno.env.get("TRELLO_API_KEY");
export const trelloWebhookCallbackURL = Deno.env.get("SERVER_HOST"); + "/api/trello/webhook-callback";