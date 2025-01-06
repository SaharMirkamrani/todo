export const isToday = (date: string): boolean => {
  const taskDate = new Date(date);
  const today = new Date();
  return (
    taskDate.getDate() === today.getDate() &&
    taskDate.getMonth() === today.getMonth() &&
    taskDate.getFullYear() === today.getFullYear()
  );
};

export const isTomorrow = (date: string): boolean => {
  const taskDate = new Date(date);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    taskDate.getDate() === tomorrow.getDate() &&
    taskDate.getMonth() === tomorrow.getMonth() &&
    taskDate.getFullYear() === tomorrow.getFullYear()
  );
};
