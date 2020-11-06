"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _express = require('express');
var _user = require('./user'); var _user2 = _interopRequireDefault(_user);
var _session = require('./session'); var _session2 = _interopRequireDefault(_session);

const routes = _express.Router.call(void 0, );
const prefixRoutes = '/api/v1';

routes.get('/', (request, response) =>
    response.json({ message: 'Hello Code83' }),
);

routes.use(`${prefixRoutes}/sessions`, _session2.default);
routes.use(`${prefixRoutes}/users`, _user2.default);

exports. default = routes;