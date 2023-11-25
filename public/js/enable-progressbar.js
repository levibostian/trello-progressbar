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

document.getElementById('enable-btn').addEventListener('click', function(){
  console.log('enable-btn clicked');

  t.card('all')
  .then(async function(card){
    console.log(JSON.stringify(card, null, 2));    

    if (card.due === null || card.start === null) {
      // TODO: modify pop-up to indicate that you cannot enable progress bar on card until dates added. for now, we will just log an error for dev. 
      console.error('Cannot enable progress bar on card without due and start dates');
      return 
    }

    // "due": "2023-12-08T12:52:00.000Z",
    // "start": "2023-11-24T14:00:00.000Z",
    let dueDate = new Date(card.due); 
    let startDate = new Date(card.start);
    let now = new Date();

    let daysDoneThusFar = Math.round((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    let daysBetweenDueDateAndStartDate = Math.round((dueDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)); 

    let progressPercentage = Math.round((daysDoneThusFar / daysBetweenDueDateAndStartDate) * 100); 

    const newTitle = `${card.name} - ${daysBetweenDueDateAndStartDate} days, ${progressPercentage}%`;

    console.log(`days done: ${daysDoneThusFar}, total days: ${daysBetweenDueDateAndStartDate}, progress percentage: ${progressPercentage}`)
    
    console.log(`new title: ${newTitle}`)            

    // https://developer.atlassian.com/cloud/trello/rest/api-group-cards/#api-cards-id-put
    $.ajax({
      url: `https://api.trello.com/1/cards/${card.id}?` + $.param({ token, key: "b6adec0a422f05429e2bfa1e2bed2b53", name: newTitle }),
      headers: {
        'Accept': 'application/json'
      },
      type: 'PUT',
      success: function(){        
        t.closePopup();        
      },
      error: function(err){ console.error('Error deleting from server: ' + JSON.stringify(err)); }
    });
  })
  .catch(function(err){
    console.error(err);
  });
});

t.render(function(){
  resize();
})