const formatDate = (dateString: string, endDateString?: string): string => {
  const startDate = new Date(dateString);
  const isToday = new Date().toDateString() === startDate.toDateString(); // Check if the task is for today

  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  let formattedDate = "";

  if (isToday) {
    formattedDate += "Today ";
  }

  formattedDate += formatTime(startDate);

  if (endDateString) {
    const endDate = new Date(endDateString);
    formattedDate += ` - ${formatTime(endDate)}`;
  }

  return formattedDate;
};

export default formatDate;
