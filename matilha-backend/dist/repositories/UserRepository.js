"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _typeorm = require('typeorm');
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);



class UserRepository  {
    

    constructor() {
        this.ormRepository = _typeorm.getRepository.call(void 0, _User2.default);
    }

     async findById(id) {
        return this.ormRepository.findOne({
            where: { id },
        });
    }

     async findByEmail(email) {
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }

     async create({ nome, email, password, carga_horaria, setor }) {
        const user = this.ormRepository.create({
            nome,
            email,
            password,
            carga_horaria,
            setor
        });

        await this.ormRepository.save(user);

        return user;
    }

     async save(user) {
        return this.ormRepository.save(user);
    }
}

exports. default = UserRepository;