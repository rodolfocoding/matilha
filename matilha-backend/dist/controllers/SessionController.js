"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _SessionService = require('../services/SessionService'); var _SessionService2 = _interopRequireDefault(_SessionService);
var _UserRepository = require('../repositories/UserRepository'); var _UserRepository2 = _interopRequireDefault(_UserRepository);

class SessionController {
     async create(request, response) {
        const { email, password } = request.body;

        const userRespository = new (0, _UserRepository2.default)();
        const createSesison = new (0, _SessionService2.default)(userRespository);

        const session = await createSesison.execute({
            email,
            password,
        });

        return response.json(session);
    }
}

exports. default = SessionController;