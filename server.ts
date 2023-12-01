import { Eta } from "https://deno.land/x/eta@v3.1.0/src/index.ts";
import { enableCard } from "./api/enable-card.ts";

const eta = new Eta({ views: "./public" });

Deno.serve(async(request: Request) => {
  const requestUrl = new URL(request.url);
  let path = requestUrl.pathname;

  switch (path) {
    // make each API endpoint a case. 
    case "/api/enable-card":
      await enableCard(request);
      return new Response("OK", { status: 200 });
    
    case "/api/trello/webhook-callback":
      // TODO: update title if card dates have changed.
      return new Response("OK", { status: 200 });

    default: // web pages 
      if (path == "/") path = "index";
      path = path.replace(".html", "");

      return new Response(eta.render(path, { TRELLO_API_KEY: Deno.env.get("TRELLO_API_KEY") }), { status: 200, headers: { "content-type": "text/html" } });
  }
});

// https://crontab.guru/every-day-at-1am
Deno.cron("Update all card titles once per day", "0 1 * * *", () => {
  
});