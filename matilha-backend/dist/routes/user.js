"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

const userRoutes = _express.Router.call(void 0, );
const userController = new (0, _UserController2.default)();

userRoutes.post('/', userController.create);
userRoutes.patch('/:id', userController.enable);

exports. default = userRoutes;