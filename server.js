const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);

//Essa é uma outra forma de criar um servidor, dado que o método listen do express()
//Chama o http.createServer, ou seja, fazer dessa forma ou diretamente pelo express
//possui o mesmo resultado

server.listen(port);

