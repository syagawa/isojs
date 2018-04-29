'use strict';

import Application from './lib';
import HelloController from './hello-controller';
import nunjucks from 'nunjucks';

nunjucks.configure(
  '/templates',
  { autoescape: false }
);

const application = new Application(
  {
  '/hello/{name*}': HelloController
  },
  {
    target: 'body'
  }
);

application.start();

console.info('hello hello client');