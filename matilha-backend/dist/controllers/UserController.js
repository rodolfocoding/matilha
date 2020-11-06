"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _CreateUserService = require('../services/CreateUserService'); var _CreateUserService2 = _interopRequireDefault(_CreateUserService);
var _UserRepository = require('../repositories/UserRepository'); var _UserRepository2 = _interopRequireDefault(_UserRepository);
var _EnableUserService = require('../services/EnableUserService'); var _EnableUserService2 = _interopRequireDefault(_EnableUserService);

class UserController {
     async create(request, response) {
        const { nome, email, password, setor, carga_horaria } = request.body;

        const userRespository = new (0, _UserRepository2.default)();
        const createUser = new (0, _CreateUserService2.default)(userRespository);

        const user = await createUser.execute({
            setor,
            carga_horaria,
            nome,
            email,
            password,
        });

        return response.json(user);
    }

     async enable(request, response) {
        const { id } = request.params;

        const userRespository = new (0, _UserRepository2.default)();
        const enableUser = new (0, _EnableUserService2.default)(userRespository);

        const user = await enableUser.execute({
            id,
        });

        return response.json(user);
    }
}

exports. default = UserController;