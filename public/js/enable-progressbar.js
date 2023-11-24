/* global TrelloPowerUp, moment, Pikaday */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();
var token = null;

var TIME_FORMAT = 'LT';

t.get('member', 'private', 'token')
.then(function(storedToken) {
  token = storedToken;
});

let resize = function(){
  t.sizeTo('.container');
};

// t.get('card', 'shared', 'unixTime')
// .then(function(unixTime) {
//   if (unixTime) {
//     // unhide remove button if card has a snooze time set
//     document.getElementById('remove-btn').classList.remove('u-hidden');
//     var existingMoment = new moment(unixTime * 1000);
//     // set pikaday to match currently set snooze date
//     picker.setMoment(existingMoment);
//     document.getElementById('time-input').value = existingMoment.format(TIME_FORMAT);
//   }
// });

document.getElementById('enable-btn').addEventListener('click', function(){
  console.log('enable-btn clicked');

  t.card('all')
  .then(function(card){
    console.log(JSON.stringify(card, null, 2));

    // $.post('/snooze?', { token: token, cardId: card.id, snoozeTime: unixTime }, function(){
    //   return t.set('card', 'shared', { idCard: card.id, time: snoozeTime, unixTime: unixTime })
    //   .then(function(){
    //     t.closePopup();
    //   });
    // });
  })
  .catch(function(err){
    console.error(err);
  });
});

// document.getElementById('remove-btn').addEventListener('click', function(){
//   t.card('id')
//   .then(function(card){
//     $.ajax({
//       url: `/snooze/${card.id}?` + $.param({ token: token }),
//       type: 'DELETE',
//       success: function(){
//         return t.set('card', 'shared', { idCard: null, time: null, unixTime: null })
//         .then(function(){
//           t.closePopup();
//         });
//       },
//       error: function(err){ console.error('Error deleting from server: ' + JSON.stringify(err)); }
//     });
//   })
//   .catch(function(err){
//     console.error('Error unarchiving card');
//     console.error(err);
//   });
// });

t.render(function(){
  resize();
})