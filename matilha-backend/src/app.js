"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@myprojects.qkmop.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//Carregando os models
const User = require("./models/user");
const Point = require("./models/Point");

//carregar rotas
const indexRoute = require("./routes/index-route");
const userRoute = require("./routes/user-route");
const pointRoute = require("./routes/point-route");

app.use(
  express.json({
    limit: "5mb",
  })
);

app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());
  next();
});

app.use("/", indexRoute);
app.use("/users", userRoute);
app.use("/points", pointRoute);

module.exports = app;
