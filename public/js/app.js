// 2d left
function getTimeLeft(card) {   
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

  return `${daysRemaining}d left`
}

// 2d used (50%)
function getTimeUsed(card) { 
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

  let progressPercentage = Math.round((daysDoneThusFar / daysBetweenDueDateAndStartDate) * 100);

  return `${daysDoneThusFar}d used (${progressPercentage}%)`
}