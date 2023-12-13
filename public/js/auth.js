window.Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var trelloAuthUrl = 'https://trello.com/1/authorize?';

// you'll want to update these for your own app :)
var authParams = {
  name: 'Progress Bar',
  expiration: 'never',
  scope: 'read,write',
  key: powerupApiKey, // powerup api key
  callback_method: 'fragment',
  return_url: 'https://' + window.location.host + '/auth-success.html',
};

var params = Object.keys(authParams);
params.forEach(function (param) {
  trelloAuthUrl += param + '=' + encodeURIComponent(authParams[param]) + '&';
});

document.getElementById('auth-btn').addEventListener('click', function () {
  t.authorize(trelloAuthUrl, { height: 680, width: 580 })
    .then(function (token) {
      // store the token in Trello private Power-Up storage
      return t.set('member', 'private', 'token', token)
    })
    .then(function () {
      // now that we have the token we needed lets go on to letting
      // the user set the snooze time
      return t.popup({
        title: 'Enable Progress Bar on Card',
        url: './enable-progressbar.html',
        height: 411
      });
    }).catch(function (e) {
      console.log(e);
    });
});