"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('reflect-metadata');
require('./config/env');
require('express-async-errors');

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
require('./database');
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _AppError = require('./errors/AppError'); var _AppError2 = _interopRequireDefault(_AppError);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

const app = _express2.default.call(void 0, );



app.use(_express2.default.json());
app.use(_routes2.default);

app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  app.use(_cors2.default.call(void 0, ));
  next();
});

app.use((err, request, response, _) => {
  if (err instanceof _AppError2.default) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  console.log(err);
  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(3333, () => console.log('Server started in port 3333!'));