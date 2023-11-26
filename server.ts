import { Eta } from "https://deno.land/x/eta@v3.1.0/src/index.ts";

const eta = new Eta({ views: "./public" });

Deno.serve((request: Request) => {
  const requestUrl = new URL(request.url);
  let path = requestUrl.pathname;
  if (path == "/") path = "index";
  path = path.replace(".html", "");

  return new Response(eta.render(path, { TRELLO_API_KEY: Deno.env.get("TRELLO_API_KEY") }), { status: 200, headers: { "content-type": "text/html" } });
});