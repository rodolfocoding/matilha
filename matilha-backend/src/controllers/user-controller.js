"use strict";

const repository = require("../repositories/user-repositorie");
const md5 = require("md5");
const authService = require("../services/auth-service");
require("dotenv").config();

exports.post = async (request, response, next) => {
  try {
    const user = await repository.create({
      name: request.body.name,
      email: request.body.email,
      password: md5(request.body.password + process.env.APP_SECRET),
      cargahoraria: request.body.cargahoraria,
      setor: request.body.setor,
    });
    response.status(201).send({
      message: "Usuário cadastrado com sucesso!",
      id: user._id,
    });
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar requisição!",
    });
  }
};

exports.authenticate = async (request, response, next) => {
  try {
    const user = await repository.authenticate({
      email: request.body.email,
      password: md5(request.body.password + process.env.APP_SECRET),
    });

    if (!user) {
      response.status(404).send({
        message: "Usuário ou senha inválidos",
      });
      return;
    }

    const token = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      setor: user.setor,
      cargahoraria: user.cargahoraria,
    });

    response.status(201).send({
      token: token,
      data: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar requisição!",
    });
  }
};

exports.refreshToken = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;
    const [, token] = authHeader.split(" ");
    const data = await authService.decodeToken(token);

    const user = await repository.getById(data.id);

    if (!user) {
      response.status(404).send({
        message: "Usuário não encontrado",
      });
      return;
    }

    const tokenGenerated = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
    });

    response.status(201).send({
      token: tokenGenerated,
      data: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar requisição!",
    });
  }
};

exports.getWorkLoad = async (request, response) => {
  try {
    const data = await repository.getWorkLoad(request.params.id);

    response.status(200).send(data);
  } catch (error) {
    response.status(500).send({
      message: "Falha ao processar requisição!",
      data: error,
    });
  }
};
