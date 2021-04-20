const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function weekDayMonth () {
  const date = new Date()
  
  const weekday  = days[date.getDay()]; 
  const day = date.getDate();
  const month = months[date.getMonth()];

  let format = `${weekday}, ${day} ${month}`;
  return format;
}

export function dayMonthYear () {
  const date = new Date()
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  
  let year  = String(date.getFullYear()) ; //2021

  year = year[2] + year[3]; //21

  let format = `${day} ${month} ${year}`;
  return format;
}