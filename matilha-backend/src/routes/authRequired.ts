import { Request, Response, NextFunction } from 'express';
import { decode } from 'jsonwebtoken';
import AppError from '../errors/AppError';

function authRequired(request: Request, response: Response, next: NextFunction): void {
    const { authorization } = request.headers
    if(authorization) {
        const token = authorization.split(' ')
        if(token[0] !== 'Bearer'|| token.length !== 2 || token[1].trim() === '') {
            throw new AppError('não autorizado', 401);
        }
        request.token = token[1]
        const tokenInfo = decode(token[1])
        if(tokenInfo === null) {
            throw new AppError('não autorizado', 401);
        }
        request.tokenInfo = tokenInfo
        next()
    } else {
        throw new AppError('não autorizado', 401);
    }
}

export default authRequired