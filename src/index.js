'use strict';

console.info("@index.js");

import Application from './lib';

import HelloController from './hello-controller';

import nunjucks from 'nunjucks';
import options from './options';

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

application.start();
