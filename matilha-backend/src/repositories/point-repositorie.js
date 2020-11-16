"use strict";

const mongoose = require("mongoose");
const Point = mongoose.model("Point");
const User = mongoose.model("User");

exports.create = async (data) => {
  const point = new Point(data);
  return point.save();
};

exports.authenticate = async (data) => {
  const res = await User.findOne({
    email: data.email,
    password: data.password,
  });
  return res;
};

exports.getByUserId = async (userid) => {
  const res = await Point.find({
    user: userid,
  });
  return res;
};
