function updateAllCards(t) {
  // TODO: get the date last time updated all cards. skip running if not enough time 

  console.log("updating all cards...");

  t.cards("all").then(function (cards) {
    cards.forEach(card => {
      updateCard(card)
    })    
  });
}

function updateCard(card) {
  console.log(JSON.stringify(card, null, 2));

  if (card.due === null || card.start === null) {
    return
  }

  // "due": "2023-12-08T12:52:00.000Z",
  // "start": "2023-11-24T14:00:00.000Z",
  let dueDate = new Date(card.due);
  let startDate = new Date(card.start);
  let now = new Date();

  let daysDoneThusFar = Math.round((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  let daysBetweenDueDateAndStartDate = Math.round((dueDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  let daysRemaining = daysBetweenDueDateAndStartDate - daysDoneThusFar;

  let progressPercentage = Math.round((daysDoneThusFar / daysBetweenDueDateAndStartDate) * 100);

  let originalTitle = card.name;

  // https://regexr.com/7nt2v
  originalTitle = originalTitle.replace(/\s*- \d+ days, \d+%/, "") // remove old progress bar if it exists

  const newTitle = `${originalTitle} - ${daysRemaining} days, ${progressPercentage}%`;

  console.log(`days done: ${daysDoneThusFar}, total days: ${daysBetweenDueDateAndStartDate}, progress percentage: ${progressPercentage}`)

  console.log(`new title: ${newTitle}`)

  // https://developer.atlassian.com/cloud/trello/rest/api-group-cards/#api-cards-id-put
  $.ajax({
    url: `https://api.trello.com/1/cards/${card.id}?` + $.param({ token, key: 'b6adec0a422f05429e2bfa1e2bed2b53', name: newTitle }),
    headers: {
      'Accept': 'application/json'
    },
    type: 'PUT',
    success: function () {
      t.closePopup();
    },
    error: function (err) { console.error('Error deleting from server: ' + JSON.stringify(err)); }
  });
}