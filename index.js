'use strict';

var formatDate = require('./formatDate.js');
console.log(formatDate(Date.now()));

var http = require('http');


// var redirect = require('shared-redirect');

// if(isRedirectRequired){
//   redirect('http://www.oreilly.comt');
// }

// if(window){
//   window.location.href = 'http://www.oreilly.com';
// }else{
//   http.createServer(function(req, res){
//     console.log(req.path);
//     res.writeHead(302, {'Location': 'http://www.oreilly.com'});
//     res.end();
//   }).listen(1337, '127.0.0.1');

  this._res.writeHead(302, {'Location': 'http://www.oreilly.com'});
// }
