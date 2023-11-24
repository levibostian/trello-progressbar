/* global TrelloPowerUp, moment, Pikaday */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe({
  appKey: 'b6adec0a422f05429e2bfa1e2bed2b53',
  appName: 'Progress Bar',
  appAuthor: 'Curiosity IO'
});
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

    let cardTitle = card.name;
    // "due": "2023-12-08T12:52:00.000Z",
    // "start": "2023-11-24T14:00:00.000Z",
    let dueDate = new Date(card.due);
    let startDate = new Date(card.start);
    let now = new Date();

    let daysDoneThusFar = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24); // TODO: wrong value 
    let daysBetweenDueDateAndStartDate = (dueDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24); // TODO: wrong value 

    let progressPercentage = (daysDoneThusFar / daysBetweenDueDateAndStartDate) * 100; // TODO: get whole number, not float 

    title = `${cardTitle} - ${progressPercentage}% ${daysBetweenDueDateAndStartDate} days`;

    console.log(`days done: ${daysDoneThusFar}, total days: ${daysBetweenDueDateAndStartDate}, progress percentage: ${progressPercentage}`)

    // TODO: make sure title is correct. 
    console.log(`new title: ${title}`)            
  })
  .catch(function(err){
    console.error(err);
  });
});

t.render(function(){
  resize();
})