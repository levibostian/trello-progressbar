import { serveFile } from "https://deno.land/std@0.207.0/http/file_server.ts";

Deno.serve((request: Request) => {
  return serveFile(request, "./public/index.html");
});