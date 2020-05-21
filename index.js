const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/connection');
const perguntaModel = require('./database/Pergunta');
const respostaModel = require('./database/Resposta');

//Connection MySql
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    })
    .catch((msgError) => {
        console.log(msgError);
    });

//EJS e arquivos estaticos
app.set('view engine','ejs');
app.use(express.static('public'));

//Body Parser
app.use(bodyParser.urlencoded({extended: false})); //Decodificar os dados enviados pelo form
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
    perguntaModel.findAll({ raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/saveQuestion", (req, res) => {
    var title = req.body.title;
    var description = req.body.question;
    
    perguntaModel.create({
        titulo: title,
        descricao: description
    }).then(() => {
        res.redirect("/")
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;

    perguntaModel.findOne({
        where: {id: id}
    }).then(pergunta => {
        if (pergunta != undefined) {
            respostaModel.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id','DESC']]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }
        else{
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId;
    
    respostaModel.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId)
    });
});

app.listen(8080, (erro) => {
    if (erro) {
        console.log("Erro ao iniciar o servidor!");
    }
    else{
        console.log("Servidor iniciado!");
    }
});