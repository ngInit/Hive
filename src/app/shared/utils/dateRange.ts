export function getDateRangeFromToday(daysBack: number) {
  if (isNaN(daysBack) || daysBack < 1) {
    throw new RangeError('Days back must be > 0');
  }
  const todayDate = new Date();
  const previousDate = new Date();
  previousDate.setDate(todayDate.getDate() - daysBack);
  return `${dateFormat(previousDate)}_${dateFormat(todayDate)}`;
}

function dateFormat(date: Date) {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
