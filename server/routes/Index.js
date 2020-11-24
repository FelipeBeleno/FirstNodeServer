const express = require("express");

const app = express();



app.use(require('./Login'));
app.use(require('./Usuarios'));
app.use(require('./Categotias'));
app.use(require('./Productos'));




module.exports = app;