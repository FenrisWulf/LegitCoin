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
    if (data.type=="payCoins") {
        
        res.write(JSON.stringify(payCoins(data)));
    }
    if (data.type=="register") {
        res.write(JSON.stringify(register(data)));
    }
            res.end();
  });
});


server.listen(3000);
function register(data) {
    var user = data.name;
    var pass = data.pass;
    var fileData = {};
    fileData.username = user;
    fileData.password = pass;
    fileData.numCoins = 0;
    if (!fs.existsSync("./"+user)) {
        fs.writeFileSync("./"+user, JSON.stringify(fileData));
        
        return {data:"true"};
    }
    else {
        return {data:"false"};
    }
}
function payCoins(data) {
   console.log("paying");
    var user = data.name;
    var otherUser = data.otherName;
    if (fs.existsSync("./"+otherUser)) {
    // Do something

   var otherData = getUserInfo(otherUser);
   if (user in buffer) {
        buffer[user] -= data.numCoins;    
    }
    else {
        buffer[user] = -1 * data.numCoins;
    }
    if (otherUser in buffer) {
        buffer[otherUser] += data.numCoins;    
    }
    else {
        buffer[otherUser] = data.numCoins;
    }
    return {data:"true"};
    }
    return {data:"false"};
}
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
       
    return getUserInfo(data.username);
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
        if (data_str != 'undefined') {
        console.log("---");
        var fileData = JSON.parse(data_str);
        fileData.numCoins -= -1 * buffer[key]; // #H4CK LYFE
        fs.writeFile("./"+key, JSON.stringify(fileData));
        delete buffer[key];
        }
        }
    }
}