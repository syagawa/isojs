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

  return name;
};

function onClick(e){
  console.log(e.currentTarget);
}


export default class HelloController extends Controller {


  attach(el){
    console.log(this.context.data.random);
    this.clickHandler = el.addEventListener('click', onClick, false);
  }

  detach(el){
    el.removeEventListener('click', onClick, false);
  }


  index(application, request, reply, callback){
    this.context.cookie.set('random', '_' + (Math.floor(Math.random() * 1000) + 1), { path: '/'});

    this.context.data = { random: Math.floor( Math.random() * 1000 ) + 1 };

    console.info(this.context.data);

    callback(null);
  }

  toString(callback){
    console.info("@hello-controller.js in HelloController Class toString");

    let context = getName(this.context);
    context.data = this.context.data;

    return nunjucks.render(
      'hello.html',
      context,
      (err, html) => {
        if(err){
          return callback(err, null);
        }
        console.info("@hello-controller.js in HelloController Class toString nunjucks render");
        callback(null, html);
      }
    );
  }
}