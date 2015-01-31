var http = require('http');
var server = http.createServer();
var fs = require('fs');

server.on('request', function (request, res, next) {
  var body = "";
        // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  request.on('data', function (chunk) {
    body += chunk;
  });
  request.on('end', function() {
   console.log(body);
   var data = JSON.parse(body);
   
    res.writeHead(200);
   if (data.type=="login") {

            res.write(JSON.stringify(login(data)));

   }
   if (data.type=="username") {
           res.write(JSON.stringify(username(data)));

   }
    
            res.end();
  });
});


server.listen(3000);

function login(data) {
    console.log("logging in");
    return {data:"true"};
}
function username(data) {
    console.log("username");
    return {username:"David", coins:"0"};
}