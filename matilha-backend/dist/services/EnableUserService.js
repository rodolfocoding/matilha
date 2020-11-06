"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var _AppError = require('../errors/AppError'); var _AppError2 = _interopRequireDefault(_AppError);





class EnableUserService {
    

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

     async execute({ id }) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new (0, _AppError2.default)('Usuário não encontrado', 400);
        }

        user.ativo = !user.ativo;

        await this.userRepository.save(user);

        return user;
    }
}

exports. default = EnableUserService;