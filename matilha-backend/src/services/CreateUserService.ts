import { hash } from 'bcryptjs';
import IUserRepository from '../repositories/IUserRepository';
import UserRepository from '../repositories/UserRepository';
import User from '../models/User';

interface Request {
    nome: string;
    email: string;
    password: string;
    carga_horaria: number;
    setor: string;
}

class CreateUserService {
    private userRepository: IUserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async execute({ nome, email, password, setor, carga_horaria }: Request): Promise<User> {
        const passwordHash = await hash(password, 8);

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

export default CreateUserService;