import Controller from './lib/controller';
import nunjucks from 'nunjucks';

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


export default class HelloController extends Controller {
  toString(callback){
    return nunjucks.render(
      'index.html',
      getName(this.context),
      (err, html) => {
        if(err){
          return callback(err, null);
        }
        // console.info(html);
        callback(null, html);
      }
    );
  }
}