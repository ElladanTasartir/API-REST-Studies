const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "Usando o get dentro da rota de produtos",
  });
});

router.post("/", (req, res, next) => {
  //por estarmos exportando para a rota /produtos, precisamos pegar a raiz
  //pois iremos entregar os dados à raiz da /produtos, ou seja, a própria produtos
  const produto = {
    nome: req.body.nome,
    preco: req.body.preco,
  };

  res.status(201).send({
    mensagem: "Usando o post dentro da rota de produtos",
    produtoCriado: produto,
  });
});

router.get("/:id_produto", (req, res, next) => {
  const id = req.params.id_produto;

  if (id === "especial") {
    return res.status(200).send({
      mensagem: "Descobriu o id especial",
      id,
    });
  }

  res.status(200).send({
    mensagem: "Usando o GET de um produto exclusivo",
    id,
  });
});

router.patch("/", (req, res, next) => {
  res.status(201).send({
    mensagem: "Usando o PATCH dentro da rota de produtos",
  });
});

router.delete("/:id", (req, res, next) => {
  res.status(201).send({
    mensagem: "Usando o DELETE dentro da rota de produtos",
    id: req.params.id,
  });
});

module.exports = router;
