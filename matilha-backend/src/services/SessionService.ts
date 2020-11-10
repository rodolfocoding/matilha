import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import IUserRepository from '../repositories/IUserRepository';
import UserRepository from '../repositories/UserRepository';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
  user: User;
}

class SessionService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const passwordCompare = await compare(password, user.password);

    if (!passwordCompare) {
      throw new AppError('Credenciais inválidas', 401);
    }

    if (!user.ativo) {
      throw new AppError('Usuário inativo', 401);
    }

    const tokenUserInfo = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      setor: user.setor,
    };

    const token = sign(tokenUserInfo, process.env.APP_SECRET as string, {
      expiresIn: '1d',
    });

    return {
      token,
      user,
    };
  }
}

export default SessionService;
