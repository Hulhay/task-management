import moment from 'moment';

export const formatDateString = (date = '', defaultFormat = 'YYYY-MM-DD') => {
  return moment(date).format(defaultFormat);
};
