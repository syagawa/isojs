'use strict';

var moment = require('moment');

var formatDate = function(date){
  return moment(date).format('MMMMM Do YYYY, h:mm:ss a');
};

module.exports = formatDate;