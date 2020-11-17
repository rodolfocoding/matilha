"use strict";

const mongoose = require("mongoose");
require("mongoose-double")(mongoose);

const Schema = mongoose.Schema;

const SchemaTypes = mongoose.Schema.Types;

const schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  day_point: {
    type: Number,
    required: true,
  },
  month_point: {
    type: Number,
    required: true,
  },
  year_point: {
    type: Number,
    required: true,
  },
  hour_point: {
    type: Number,
    required: true,
  },
  minute_point: {
    type: SchemaTypes.Decimal128,
    required: true,
  },
});

module.exports = mongoose.model("Point", schema);
