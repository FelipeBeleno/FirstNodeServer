const express = require("express");

const app = express();



app.use(require('./Login'))
app.use(require('./Usuarios'))



module.exports = app;