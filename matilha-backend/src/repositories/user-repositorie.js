"use strict";

const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.create = async (data) => {
  const user = new User(data);
  return user.save();
};

exports.authenticate = async (data) => {
  const res = await User.findOne({
    email: data.email,
    password: data.password,
  });
  return res;
};

exports.getById = async (id) => {
  const res = await User.findById(id);
  return res;
};
