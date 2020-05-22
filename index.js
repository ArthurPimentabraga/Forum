const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/connection');
const questionModel = require('./database/Question');
const answerModel = require('./database/Answer');

//Connection MySql
connection
    .authenticate()
    .then(() => {
        console.log("Connection success!");
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
    questionModel.findAll({ raw: true, order:[
        ['id','DESC']
    ]}).then(questions => {
        res.render("index",{
            questions: questions
        });
    });
});

app.get("/toAsk", (req, res) => {
    res.render("toAsk");
});

app.post("/saveQuestion", (req, res) => {
    var title = req.body.title;
    var description = req.body.question;
    
    questionModel.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect("/")
    });
});

app.get("/question/:id", (req, res) => {
    var id = req.params.id;

    questionModel.findOne({
        where: {id: id}
    }).then(question => {
        if (question != undefined) {
            answerModel.findAll({
                where: {questionId: question.id},
                order: [['id','DESC']]
            }).then(answers => {
                res.render("question", {
                    question: question,
                    answers: answers
                });
            });
        }
        else{
            res.redirect("/");
        }
    });
});

app.post("/saveReply", (req, res) => {
    var body = req.body.body;
    var questionId = req.body.questionId;
    
    answerModel.create({
        body: body,
        questionId: questionId
    }).then(() => {
        res.redirect("/question/"+questionId)
    });
});

app.listen(8080, (erro) => {
    if (erro) {
        console.log("Error when starding the server!");
    }
    else{
        console.log("Server Started!");
    }
});