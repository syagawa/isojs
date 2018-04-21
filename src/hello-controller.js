import Controller from './lib/controller';
import nunjucks from 'nunjucks';

console.info("@hello-controller.js");

nunjucks.configure('./dist');

function getName(request){
  let name = {
    fname: "Rick",
    lname: "Sanchez"
  };

  let nameParts = request.params.name ? request.params.name.split('/') : [];

  name.fname = (nameParts[0] || request.query.fname) || name.fname;
  name.lname = (nameParts[1] || request.query.lname) || name.lname;

  console.info("@hello-controller.js in getName()");

  return name;
};


export default class HelloController extends Controller {
  toString(callback){
    console.info("@hello-controller.js in HelloController Class");
    return nunjucks.render(
      'hello.html',
      getName(this.context),
      (err, html) => {
        if(err){
          return callback(err, null);
        }
        callback(null, html);
      }
    );
  }
}