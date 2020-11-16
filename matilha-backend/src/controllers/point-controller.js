"use strict";

const repository = require("../repositories/point-repositorie");
const md5 = require("md5");
const authService = require("../services/auth-service");
require("dotenv").config();

exports.post = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;
    const [, token] = authHeader.split(" ");

    const data = await authService.decodeToken(token);

    const passwordIsValid = await repository.authenticate({
      email: data.email,
      password: md5(request.body.password + process.env.APP_SECRET),
    });

    if (!passwordIsValid) {
      response.status(404).send({
        message: "Senha inválida",
      });
      return;
    }

    await repository.create({
      user: data.id,
      date_point: new Date(),
    });

    response.status(201).send({
      message: "Ponto registrado com sucesso!",
    });
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar requisição!",
      data: e,
    });
  }
};

exports.getByUserId = async (request, response, next) => {
  try {
    const data = await repository.getByUserId(request.params.id);
    response.status(200).send(data);
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar requisição!",
    });
  }
};
