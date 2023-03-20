const moment = require('moment');

exports.getExpirationDate = (days) => {
  if (days > 30) {
    const afterDays = moment().add(3, 'days');
    return moment(afterDays).valueOf();
  } else {
    const afterDays = moment().add(days, 'days');
    return moment(afterDays).valueOf();
  }
};
