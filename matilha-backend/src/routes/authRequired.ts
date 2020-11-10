import { decode } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import unauthorizedMsg from '../errors/unauthorized';

function authRequired(request: Request, response: Response, next: NextFunction): void {
    const { headers: { authorization } } = request;
    const unauthorized = (code: number) => { response.status(code).json(unauthorizedMsg); }
    if (!authorization) {
        return unauthorized(400);
    }
    const token = authorization.split(' ') || [];
    if (token.length !== 2 || token[0] !== 'Bearer' || token[1].trim() === '') {
        return unauthorized(400);
    }
    Object.assign(request, { ...request, token: token[1] })
    const tokenInfo = decode(token[1]);
    if (tokenInfo === null) {
        return unauthorized(401);
    }
    Object.assign(request, { ...request, tokenInfo })
    next();
}

export default authRequired;
