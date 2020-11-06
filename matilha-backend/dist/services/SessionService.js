"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs');
var _jsonwebtoken = require('jsonwebtoken');



var _AppError = require('../errors/AppError'); var _AppError2 = _interopRequireDefault(_AppError);











class SessionService {
    

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

     async execute({ email, password }) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new (0, _AppError2.default)('Credenciais inválidas', 401);
        }

        const passwordCompare = await _bcryptjs.compare.call(void 0, password, user.password);

        if (!passwordCompare) {
            throw new (0, _AppError2.default)('Credenciais inválidas', 401);
        }

        if (!user.ativo) {
            throw new (0, _AppError2.default)('Usuário inativo', 401);
        }

        const token = _jsonwebtoken.sign.call(void 0, {}, process.env.APP_SECRET , {
            expiresIn: '1d',
        });

        return {
            token,
            user,
        };
    }
}

exports. default = SessionService;