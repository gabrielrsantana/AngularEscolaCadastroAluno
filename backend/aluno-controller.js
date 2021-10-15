var express = require("express");
var router = express.Router();
var Aluno = require("./aluno-model");

router.post("/", function (req, res) {
  console.log(req.body);
  p = new Aluno({
    nome: req.body.nome,
    turma: req.body.turma,
    dataNasc: req.body.dataNasc,
    matricula: req.body.matricula,
  });
  p.save((err, alu) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(alu);
  });
});

router.get("/", function (req, res) {
  Aluno.find().exec((err, alus) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(alus);
  });
});

router.delete("/:id", function (req, res) {
  Aluno.deleteOne({ _id: req.params.id }, (err) => {
    if (err) res.status(500).send(err);
    else res.status(200).send({});
  });
});

router.patch("/:id", function (req, res) {
  console.log(req.body);
  Aluno.findById(req.params.id, (err, alu) => {
    if (err) res.status(404).send(err);
    else {
      alu.nome = req.body.nome;
      alu.turma = req.body.turma;
      alu.dataNasc = req.body.dataNasc;
      alu.matricula = req.body.matricula;

      console.log(alu);
      alu.save((err, alu) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else res.status(200).send(alu);
      });
    }
  });
});

module.exports = router;
