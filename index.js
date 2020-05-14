const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//EJS e arquivos estaticos
app.set('view engine','ejs');
app.use(express.static('public'));

//Body Parser
app.use(bodyParser.urlencoded({extended: false})); //Decodificar os dados enviados pelo form
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/saveQuestion", (req, res) => {
    var title = req.body.title;
    var question = req.body.question;
    res.send("title: "+title+"<br/>question:"+question);
});

app.listen(8080, (erro) => {
    if (erro) {
        console.log("Erro ao iniciar o servidor!");
    }
    else{
        console.log("Servidor iniciado!");
    }
});