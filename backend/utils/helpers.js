const moment = require('moment');

exports.getExpirationDate = (date) => {
  if (date > 30) {
    const afterDays = moment().add(3, 'days');
    return moment(today).valueOf();
  } else {
    const afterDays = moment().add(date, 'days');
    return moment(today).valueOf();
  }
};
