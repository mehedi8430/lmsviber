export const formatMyDate = (date) => {
  if (!date) return "Invalid Date"; // Handle missing or undefined date

  // Ensure that the date is a Date object or convert it
  // const validDate = new Date(date.includes('-') ? `${date}T00:00:00` : date);
  const validDate = new Date(date);
  if (isNaN(validDate)) return "Invalid Date"; // Handle invalid date strings

  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(validDate);

  return formattedDate;
}

export const formatDuration = (duration) => {
  if (!duration) return null;

  const hour = Math.floor(duration / 3600).toString().padStart(2, '0');
  const min = Math.floor((duration % 3600) / 60).toString().padStart(2, '0');
  const sec = Math.floor(duration % 60).toString().padStart(2, '0');

  const durationString = `${hour}:${min}:${sec}`;
  
  return durationString;
};