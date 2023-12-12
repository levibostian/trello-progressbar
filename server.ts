import { Eta } from "https://deno.land/x/eta@v3.1.0/src/index.ts";
import { enableCard } from "./api/enable-card.ts";
import { updateCards } from "./api/update-cards.ts";

const eta = new Eta({ views: "./public" });

// https://crontab.guru/every-day-at-1am
Deno.cron("Update all card titles once per day", "0 1 * * *", () => {
  return updateCards()
});

Deno.serve(async(request: Request) => {
  const requestUrl = new URL(request.url);
  let path = requestUrl.pathname;

  console.log(`request ${request.method} ${path} ${await request.text()}`)

  switch (path) {
    // make each API endpoint a case. 
    case "/api/enable-card":
      await enableCard(request);
      return new Response("OK", { status: 200 });

    case "/api/update-cards": // TODO: will remove. here for trying it out. 
      await updateCards();
      return new Response("OK", { status: 200 });
    
    case "/api/trello/webhook-callback":
      //await trello.handleWebhookCallback(request);
      return new Response("OK", { status: 200 });

    default: // web pages 
      if (path == "/") path = "index";
      path = path.replace(".html", "");

      return new Response(eta.render(path, { TRELLO_API_KEY: Deno.env.get("TRELLO_API_KEY") }), { status: 200, headers: { "content-type": "text/html" } });
  }
});
