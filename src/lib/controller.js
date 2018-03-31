export default class Controller{
  constructor(context){
    this.context = context;
    console.info("@lib/index.js Controller Class constructor");
  }

  index(application, request, reply, callback){
    callback(null);
    console.info("@lib/index.js Controller Class index");
  }

  toString(callback){
    callback(null, '成功');
    console.info("@lib/index.js Controller Class toString");
  }
}