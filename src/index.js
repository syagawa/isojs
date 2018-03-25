'user strict';

import Hapi from 'hapi';
import nunjucks from 'nunjucks';

nunjucks.configure('./dist');

const server = Hapi.Server({
  host: "localhost",
  port: 8000
});

server.route({
  method: "GET",
  path: "/hello",
  handler: function(request, reply){
    return nunjucks.render(
      'index.html',
      {
        fname: 'Rick',
        lname: 'Sanchez'
      }
      // function(err, html){
      //   // console.info(this);
      //   // console.info(reply);
      //   // console.info(reply.length);
      //   // console.info(html);
      //   // reply.response(html);
      //   // return html;
      //   // console.info(reply.file);
      //   // reply(html);
      //   // return html;
      //   // reply.view(html);
      //   // return reply;
      //   // return reply.context;
      //   console.log(reply);
      //   // console.log(reply.authenticated);
      //   // console.log(reply.response);
      //   // console.log(reply.entity);
      //   // console.log(reply.request);
      //   // reply.authenticated(html);
      //   reply.response(html);
      // }
    );
  }
});

async function start(){

  try{
    await server.start();
  }catch(err){
    console.log(err);
    process.exit(1);
  }

  console.log("Server running at: ", server.info.uri);
}

start();


// server.start();