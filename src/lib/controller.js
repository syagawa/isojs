console.info("@Controller.js");
export default class Controller{
  constructor(context){
    this.context = context;
    console.info("@lib/Controller.js Controller Class constructor");
  }

  index(application, request, reply, callback){
    callback(null);
    console.info("@lib/Controller.js Controller Class index");
  }

  toString(callback){
    callback(null, '成功');
    console.info("@lib/Controller.js Controller Class toString");
  }

  render(target, callback){
    console.info("@lib/Controller.js Controller Class render");
    this.toString(function(err, body){
      if(err){
        return callback(err, null);
      }

      console.info("@lib/Controller.js Controller Class render toString callback", body);

      document.querySelector(target).innerHTML = body;
      callback(null, body);

    });
  }

  serialize(){
    return JSON.stringify( this.context.data || {} );
  }

  deserialize(){
    this.context.data = JSON.parse(window.__STATE__);
  }

  attach(el) {
    // to be implemented by the application
  }

  detach(el) {
    // to be implemented by the application
  }
}