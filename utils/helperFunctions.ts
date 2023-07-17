export function formatDate(dateString: string) {
  // Create a Date object from the date string
  const date = new Date(dateString);

  // Calculate the difference between the current time and the provided time, in milliseconds
  const timeDifference = Date.now() - date.getTime();

  // Calculate the number of days difference
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Generate the string to return
  let dateStrings;
  if (daysDifference === 0) {
    // Calculate the number of hours difference
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    if (hoursDifference === 0) {
      // Calculate the number of minutes difference
      const minutesDifference = Math.floor(timeDifference / (1000 * 60));
      if (minutesDifference === 0) {
        // Calculate the number of seconds difference
        const secondsDifference = Math.floor(timeDifference / 1000);
        dateStrings = `${secondsDifference} seconds ago`;
      } else {
        dateStrings = `${minutesDifference} minutes ago`;
      }
    } else {
      dateStrings = `${hoursDifference} hours ago`;
    }
  } else if (daysDifference < 30) {
    dateStrings = `${daysDifference} days ago`;
  } else {
    // Calculate the number of months difference
    const monthsDifference = Math.floor(daysDifference / 30);
    dateStrings = `${monthsDifference} months ago`;
  }

  return dateStrings;
}
