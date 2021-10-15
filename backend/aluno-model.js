var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alunoSchema = new Schema({
  nome:  String,
  turma: String,
  dataNasc: String,
  matricula: Number
})

module.exports = mongoose.model("Aluno", alunoSchema);