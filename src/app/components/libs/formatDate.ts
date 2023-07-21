import { format, isThisYear } from 'date-fns';

export const formatDate = (date: string) => {
  const d = new Date(date);
  const dateStr = [
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2)
  ].join('-');
  return dateStr
  // return isThisYear(currentDate)
  //   ? format(currentDate, 'MMM d')
  //   : format(currentDate, 'MMM d, y');
};
