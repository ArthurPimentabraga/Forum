const express = require('express');
const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(8080, (erro) => {
    if (erro) {
        console.log("Erro ao iniciar o servidor!");
    }
    else{
        console.log("Servidor iniciado!");
    }
});