export default class Controller{
  constructor(context){
    this.context = context;
  }

  index(application, request, reply, callback){
    console.info("application");
    console.info(application);
    console.info("request");
    console.info(request);
    console.info("reply");
    console.info(reply);
    console.info("callback");
    console.info(callback);

    callback(null);
  }

  toString(callback){
    callback(null, '成功');
  }
}