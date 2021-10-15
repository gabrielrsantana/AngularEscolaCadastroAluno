const express = require('express');
const cors = require ('cors');
const mongoose = require ('mongoose');
const alunoController = require('./aluno-controller')

const meuBancoUrl = 'mongodb+srv://weslley_brilhante:weslley_brilhante@cluster0.hwyx2.mongodb.net/aplicacaoHTTP?retryWrites=true&w=majority';
const app = express();

mongoose.connect(meuBancoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.use('/alunos', alunoController)

app.listen(3000, () => {
    console.log("Servidor rodando na porta ", 3000);
});