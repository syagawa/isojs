export default class Application{
  constructor(routes, options){
    this.server = options.server;
    this.registerRoutes(routes);
    console.info("@lib/index.js Application Class constructor");
  }

  registerRoutes(routes){
    for(let path in routes){
      this.addRoute(path, routes[path]);
    }
    console.info("@lib/index.js Application Class registerRoute");
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
        controller.index(this, request, reply, (err) => {
          if(err){
            return reply(err);
          }
          controller.toString((err, html) => {
            if(err){
              return reply(err);
            }
            reply(html);
          });
        });
        console.info("@lib/index.js Application Class addRoute2");
      }
    });
    console.info("@lib/index.js Application Class addRoute1");
  }

  start(){
    this.server.start();
    console.info("@lib/index.js Application Class start");
  }
}
