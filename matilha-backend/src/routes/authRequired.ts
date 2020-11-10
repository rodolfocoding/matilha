import { decode } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import unauthorizedMsg from '../errors/unauthorized';

function authRequired(request: Request, response: Response, next: NextFunction): void {
    const { headers: { authorization } } = request;
    const unauthorized = (code: number) => { response.status(code).json(unauthorizedMsg); }
    if (!authorization) {
        return unauthorized(400);
    }
    const [ tokenBearer, token ] = authorization.split(' ');
    if (tokenBearer !== 'Bearer' || !token || token.trim() === '') {
        return unauthorized(400);
    }
    Object.assign(request, { ...request, token })
    const tokenInfo = decode(token);
    if (!tokenInfo) {
        return unauthorized(401);
    }
    Object.assign(request, { ...request, tokenInfo })
    next();
}

export default authRequired;
