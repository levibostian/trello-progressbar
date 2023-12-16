# Trello Time Blindness Power-Up

Trello Power-Up helping people with time blindness. Have a due date? This powerup tries to communicate that due date in a more realistic way.

# Development testing

* Run a local web server. I find this command to be pretty handy `python3 -m http.server 8080`
* Expose your local web server to the public Internet so Trello's servers can communicate with your server. ngrok is great or cloudflare `cloudflared tunnel --url localhost:8080`
* Create [a new Trello Power-Up](https://trello.com/power-ups/admin/new). I recommend naming it "___ dev" to remind yourself that this powerup you're making is only for development.
* After creating the new powerup, set *Iframe connector URL (Required for Power-Up)* to the URL that ngrok or cloudflared gives you.
* Open a board of yours in Trello. Add powerups > custom > add your new powerup you just made.
* Refresh your Trello board. Your powerful should now be running! 

# Tests

```
npm install --global mocha
mocha .
```
