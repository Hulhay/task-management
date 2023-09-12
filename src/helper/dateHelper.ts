import moment from 'moment';

export const formatDateString = (date = '', defaultFormat = 'YYYY-MM-DD') => {
  return moment(date).format(defaultFormat);
};

export const buildDueDate = (date: Date, time: Date) => {
  return `${formatDateString(date.toISOString(), 'YYYY-MM-DD')} ${formatDateString(
    time.toISOString(),
    'HH:mm:ss',
  )}`;
};

export const stringToDateTime = (dateTimeString: string) => {
  const dateParts = dateTimeString.split(' ');
  const [datePart, timePart] = dateParts;
  const [year, month, day] = datePart.split('-');
  const [hour, minute, second] = timePart.split(':');
  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hour),
    parseInt(minute),
    parseInt(second),
  );
};
