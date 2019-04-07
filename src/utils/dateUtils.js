import moment from 'moment';
import 'moment/locale/vi';
import strings from '../constants/Strings';
//2011-08-12T20:17:46.384Z
export const formatDate = (date, type = 1) => {
  // if type === 1 then it will format time like comment in facebook:
  // if type === 2 then it will format dd/MM/YYYY
  if (strings.getLanguage() === 'vi') {
    moment.locale('vi');
  } else {
    moment.locale('en');
  }
  switch (type) {
    case 1:
      const dateTime = moment(moment(date).subtract(moment().utcOffset(), 'minutes'));
      const diffDays = dateTime.diff(moment(moment().subtract(moment().utcOffset(), 'minutes')), 'days', true);
      const diffMonthsTest = dateTime.diff(moment().startOf('month'), 'months', true);
      const diffYearsTest = dateTime.diff(moment().startOf('year'), 'years', true);
      if (diffYearsTest >= 0) {
        //this year
        if (diffMonthsTest >= 0) {
          // this month
          if (diffDays > 0) {
            //today
            return dateTime.fromNow();
          } else if (diffDays >= -1 && diffDays < 0) {
            //yesterday
            return dateTime.calendar();
          }
          // other days before
          return moment(date)
            .subtract(moment().utcOffset(), 'minutes')
            .format('MMM DD[,] hh:mm A');
        }
        // other months before
        return moment(date)
          .subtract(moment().utcOffset(), 'minutes')
          .format('MMM DD[,] hh:mm A');
      }
      //other years before:
      return moment(date)
        .subtract(moment().utcOffset(), 'minutes')
        .format('lll');
    case 2:
      return moment(date)
        .subtract(moment().utcOffset(), 'minutes')
        .format('DD/MM/YYYY');
    default:
      break;
  }
};

export const formatDateToPushToServer = date => `${moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`;
