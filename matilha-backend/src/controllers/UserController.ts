import { Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import CreateUserService from '../services/CreateUserService';
import UserRepository from '../repositories/UserRepository';
import EnableUserService from '../services/EnableUserService';
import AppError from '../errors/AppError';

class UserController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { nome, email, password, setor, carga_horaria } = request.body;

        const userRespository = new UserRepository();
        const createUser = new CreateUserService(userRespository);

        const user = await createUser.execute({
            setor,
            carga_horaria,
            nome,
            email,
            password,
        });

        return response.json(user);
    }

    public async enable(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const userRespository = new UserRepository();
        const enableUser = new EnableUserService(userRespository);

        const user = await enableUser.execute({
            id,
        });

        return response.json(user);
    }

    public async me(request: Request, response: Response): Promise<Response> {
    return response.json(request.tokenInfo)
    }
}

export default UserController;