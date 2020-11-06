"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs');












class CreateUserService {
    

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

     async execute({ nome, email, password, setor, carga_horaria }) {
        const passwordHash = await _bcryptjs.hash.call(void 0, password, 8);

        const user = await this.userRepository.create({
            nome,
            email,
            password: passwordHash,
            setor,
            carga_horaria,
        });

        return user;
    }
}

exports. default = CreateUserService;