"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date_point: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Point", schema);
