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
   if (data.type=="incCoins") {
           res.write(JSON.stringify(incCoins(data)));

   }
    
            res.end();
  });
});


server.listen(3000);

function login(data) {
    console.log("logging in");
    return {data:"true"};
}
function getUserInfo(user) {
    var file = fs.readFileSync("./"+user);       
    return JSON.parse(file);
}
function username(data) {
    console.log("username");
       
    return getUserInfo("David");
}
var buffer = {};
function incCoins(data) {
    console.log("incCoins");
    var dataToWrite = {};
    console.log(data);
    var user = data.name;
    if (user in buffer) {
        buffer[user] += data.numCoins;    
    }
    else {
        buffer[user] = data.numCoins;
    }
    return {username:user, numCoins:buffer[user]};
}

setInterval(store, 100);

function store() {
    for (var key in buffer) {
        if (key != 'undefined') {
        var data_str = fs.readFileSync("./"+key);
        console.log("---");
        console.log(data_str);
        var fileData = JSON.parse(data_str);
        fileData.numCoins += buffer[key];
        fs.writeFile("./"+key, JSON.stringify(fileData));
        delete buffer[key];
        }
    }
}