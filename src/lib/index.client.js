import Call from 'call';
import query from 'query-string';

console.info("@lib/index.client.js");

export default class Application {
  constructor(routes, options){
    this.routes = routes;
    this.options = options;

    console.info("@lib/index.client.js Application Class constructor");

    this.router = new Call.Router();
    this.registerRoutes(routes);
  }

  registerRoutes(routes){
    console.info("@lib/index.client.js Application Class registerRoutes");
    for(let path in routes){
      this.router.add({
        path: path,
        method: 'get'
      });
    }
  }

  navigate(url, push=true){

    console.info("@lib/index.client.js Application Class navigate");

    if(!history.pushState){
      window.location = url;
      return;
    }

    let urlParts = url.split('?');
    let [path, search] = urlParts;
    let match = this.router.route('get', path);
    let {route, params} = match;
    let Controller = this.routes[route];

    if(route && Controller){
      console.log(match);
      console.log(Controller);

      const controller = new Controller({
        query: query.parse(search),
        params: params
      });

      const request = () => {};
      const reply = () => {};

      controller.index(this, request, reply, (err) => {
        if(err){
          return reply(err);
        }

        console.info("@lib/index.client.js Application Class navigate controller.index");
        controller.render(this.options.target, (err, response) => {
          if(err){
            return reply(err);
          }

          reply(response);

        })

      });

    }

    if(push){
      history.pushState({}, null, url);
    }

  }

  start(){
    console.info("@lib/index.client.js Application Class start");
    this.poStateListener = window.addEventListener('popstate', (e) => {
      let {pathname, search} = window.location;
      let url = `${pathname}${search}`;
      this.navigate(url, false);
    });
    this.clickListener = document.addEventListener('click', (e) => {
      let {target} = e;
      let identifier = target.dataset.navigate;
      let href = target.getAttribute('href');

      console.info("@lib/index.client.js Application Class click");


      if(identifier !== undefined){
        if(href){
          e.preventDefault();
        }

        this.navigate( identifier || href);
      }
    });
  }


}