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

export function dayMonthYear (published) {
  const date = new Date(published);

  const day = date.getDate();
  let month = months[date.getMonth()]; //january
  month = month.slice(0,3) //jan

  let year  = String(date.getFullYear()) ; //2021
  year = year.slice(2,3) ; //21  

  let format = `${day} ${month} ${year}`;
  return format
}