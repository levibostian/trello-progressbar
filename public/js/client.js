/* global TrelloPowerUp */

// we can access Bluebird Promises as follows
window.Promise = TrelloPowerUp.Promise;

// We need to call initialize to get all of our capability handles set up and registered with Trello
TrelloPowerUp.initialize({
  'card-badges': function (t, opts) { // https://developer.atlassian.com/cloud/trello/power-ups/capabilities/card-badges/
    return t.card('all')
    .then(function (card) {
      // don't show any badges if the card is not setup with start and due dates. 
      if (card.due === null || card.start === null) {
        return []
      }
      // dont show any badges if the due date is in the past.
      if (new Date(card.due) < new Date()) {
        return []
      }
    
      return [
        {
          // Time left badge.             
          dynamic: function () {
            return t.card('all')
              .then(function (card) {
                return {
                  text: getTimeLeft(card), 
                  color: "purple",
                  refresh: 3600, // 1 hour, in seconds
                };
              })
          },
        },
        {
          // Time used badge. 
          dynamic: function () {
            return t.card('all')
              .then(function (card) {
                return {
                  text: getTimeUsed(card), 
                  color: "yellow",
                  refresh: 3600, // 1 hour, in seconds
                };
              })
          },
        }
      ];
    })
  },
  'card-buttons': function (t, opts) {
    // check that viewing member has write permissions on this board
    if (opts.context.permissions.board !== 'write') {
      return [];
    }
    return t.get('member', 'private', 'token')
      .then(function (token) {
        return [{
          icon: 'https://cdn.hyperdev.com/07656aca-9ccd-4ad1-823c-dbd039f7fccc%2Fzzz-grey.svg',
          text: 'Progress bar',
          callback: function (context) {
            if (!token) {
              context.popup({
                title: 'Authorize Your Account',
                url: './auth.html',
                height: 75
              });
            } else {
              context.popup({
                title: 'Enable Progress Bar on Card',
                url: './enable-progressbar.html',
                height: 75
              });
            }
          }
        }];
      }).catch(function (err) {
        console.error(err);
      });
  }
});