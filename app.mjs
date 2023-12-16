
// 2d left
export function getTimeLeft(card) {   
  if (card.due === null || card.start === null) {
    return
  }

  let timeData = getTimeDataFromCard(card);

  console.log(timeData);

  if (timeData.hoursRemaining < 24) {
    return `${timeData.hoursRemaining}h left`
  }

  // WRONG
  return `${timeData.daysRemaining}d left`
}

// 2d used (50%)
export function getTimeUsed(card) { 
  if (card.due === null || card.start === null) {
    return
  }

  let timeData = getTimeDataFromCard(card);

  return `${timeData.daysDoneThusFar}d used (${timeData.progressPercentage}%)`
}

function getTimeDataFromCard(card) {
  // "due": "2023-12-08T12:52:00.000Z",
  // "start": "2023-11-24T14:00:00.000Z",
  let dueDate = new Date(card.due);
  let startDate = new Date(card.start);  
  startDate.setHours(0,0,0,0); // make start date midnight. trello makes it 8am by default. we get more accurate hour calculations this way.
  let now = new Date();

  let hoursBetweenDueDateAndStartDate = Math.round((dueDate.getTime() - startDate.getTime()) / (1000 * 60 * 60));

  let hoursDoneThusFar = Math.round((now.getTime() - startDate.getTime()) / (1000 * 60 * 60));
  let hoursRemaining = hoursBetweenDueDateAndStartDate - hoursDoneThusFar;
  
  let daysDoneThusFar = Math.round(hoursDoneThusFar / 24); 
  let daysRemaining = Math.round(hoursRemaining / 24);  

  let progressPercentage = Math.round((hoursDoneThusFar / hoursBetweenDueDateAndStartDate) * 100);

  // console.log(`card start date: ${startDate}`);
  // console.log(`card due date: ${dueDate}`);
  // console.log(`now: ${now}`);
  // console.log(`hours done thus far: ${hoursDoneThusFar}`);
  // console.log(`hours between due date and start date: ${hoursBetweenDueDateAndStartDate}`);

  return {
    dueDate,
    startDate,
    now,
    hoursBetweenDueDateAndStartDate,
    hoursRemaining,
    daysRemaining,
    hoursDoneThusFar,
    daysDoneThusFar,
    progressPercentage
  }
}