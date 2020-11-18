"use strict";

const repository = require("../repositories/point-repositorie");
const md5 = require("md5");
const authService = require("../services/auth-service");
const { response } = require("express");
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

    console.log(passwordIsValid.name);

    const date_point = new Date();
    const minutes = date_point.getMinutes();
    const convertMinutes = minutes / 60;

    await repository.create({
      user: data.id,
      day_point: date_point.getDate(),
      month_point: date_point.getMonth(),
      year_point: date_point.getFullYear(),
      hour_point: date_point.getHours(),
      minute_point: convertMinutes,
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

exports.getDatePoint = async (request, response, next) => {
  try {
    const datePoint = new Date();

    const dia = datePoint.getDay();
    const mes = datePoint.getMonth();
    const ano = datePoint.getFullYear();

    const dateFormat = dia + "/" + mes + "/" + ano;

    response.status(200).send({
      datePoint: dateFormat,
    });
  } catch (error) {
    response.status(500).send({
      message: "Falha ao processar requisição!",
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
