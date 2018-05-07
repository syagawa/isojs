import cookieFactory from './cookie';

console.info("@lib/index.js");

export default class Application{
  constructor(routes, options){
    this.server = options.server;
    this.document = options.document;
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
        console.info("@lib/index.js Application Class addRoute handler1");
        const controller = new Controller({
          query: request.query,
          params: request.params,
          cookie: cookieFactory(request, reply)
        });
        controller.index(this, request, reply, (err) => {
          console.info("@lib/index.js Application Class addRoute handler controller.index");

          if(err){
            return reply(err);
          }
          controller.toString((err, html) => {
            console.info("@lib/index.js Application Class addRoute handler controller.index toString");
            if(err){
              return reply(err);
            }
            this.document(
              this,
              controller,
              request,
              reply,
              html,
              function(err, html){
                console.info("@lib/index.js Application Class addRoute handler controller.index toString document callback");
                if(err){
                  return reply(err);
                }
                reply(html);
              }
            );
          });
        });
        console.info("@lib/index.js Application Class addRoute handler2");
      }
    });
    console.info("@lib/index.js Application Class addRoute");
  }

  start(){
    this.server.start();
    console.info("@lib/index.js Application Class start");
  }
}
