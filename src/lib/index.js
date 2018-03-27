export default class Application{
  constructor(routes, options){
    this.server = options.server;
    this.registerRoutes(routes);
  }

  registerRoutes(routes){
    for(let path in routes){
      this.addRoute(path, routes[path]);
    }
  }

  addRoute(path, Controller){
    this.server.route({
      path: path,
      method: 'GET',
      handler: (request, reply) => {
        const controller = new Controller({
          query: request.query,
          params: request.params
        });
        console.info(controller);

        controller.index(this, request, reply, (err) => {
          // console.info(request,reply);
          if(err){
            return reply(err);
          }

          controller.toString((err, html) => {
            if(err){
              return reply(err);
            }

            // reply(html);

            // console.info("this");
            // console.info(this);
            // console.info("err");
            // console.info(err);
            // console.info("html");
            // console.info(html);
            // console.info("request");
            // console.info(request);
            // console.info("reply");
            // console.info(reply);

            // console.info(reply.context);
            // reply.response(html);
            // html;

            return html;

          });
        });


      }
    });
  }

  start(){
    this.server.start();
  }
}

// const handler = function (request, h) {

//     return this.message;    // Or h.context.message
// };

// exports.plugin = {
//     name: 'example',
//     register: function (server, options) {

//         const bind = {
//             message: 'hello'
//         };

//         server.bind(bind);
//         server.route({ method: 'GET', path: '/', handler });
//     }
// };

// const Hapi = require('hapi');
// const server = Hapi.server({ port: 80 });

// const handler = function (request, h) {

//     return h.response('The page was not found').code(404);
// };

// server.route({ method: '*', path: '/{p*}', handler });