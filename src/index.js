'use strict';

import Application from './lib';

import HelloController from './hello-controller';

import nunjucks from 'nunjucks';
import options from './options';

console.info("@index.js 1");

nunjucks.configure(
  options.nunjucks.path,
  options.nunjucks.options
);


const application = new Application(
  {
    '/hello/{name*}': HelloController
  },
  options
);

console.info("@index.js 2");

application.start();
