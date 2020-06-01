const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

//CORS = Cross Origin Resource Sharing
//Funcionalidade que permite que um site acesse outro site dependendo de algumas restrições

const rotaProdutos = require("./routes/produtos");
const rotaPedidos = require("./routes/pedidos");

app.use(morgan("dev"));
//O middleware morgan irá passar por nossas requisições e logar
//O método http usado, a rota, o status code, o tempo de execução, entre outros fatores
app.use(bodyParser.urlencoded({ extended: false }));
//significa que apenas aceitaremos dados simples, ou seja, não podemos colocar nested objects dentro
//do corpo da requisiçã por exemplo, quando o formato é o form url encoded
app.use(bodyParser.json());
//permite com que o body faça o parsing do json

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  //Dando permissão de acesso a * (todos) os endereços de request
  //Se fosse um servidor em produção, poderia colocar o endreço que deseja atender àquela API, como
  //"Acess-Control-Allow-Origin", "http://foo.bar.com"
  res.header(
    "Acess-Control-Allow-Header",
    "Origin, X-Requested-With, Accept, Authorization, Content-Type"
  ); //Quais os headers que a nossa API vai aceitar receber

  if (req.method === "OPTIONS") {
    //Se o método usado for o OPTIONS, passaremos
    //como permitidos esses métodos http:
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({});
  }

  next();
});

app.use("/produtos", rotaProdutos);
app.use("/pedidos", rotaPedidos);

//Tratamento para quando não encontrar nenhuma rota
app.use((req, res, next) => {
  const erro = new Error("Não encontrado");
  erro.status = 404;
  next(erro); //Vai passar o erro para o próximo middleware
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      message: error.message, //Vai pegar a mensagem do erro enviada no Error() e renderizar na tela
    },
  });
});

module.exports = app;
