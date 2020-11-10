import { decode } from 'jsonwebtoken';
import AppError from '../errors/AppError';

function authRequired(request: Request, response: Response, next): Promise<Response> {
    const { authorization : auth } = request.headers
    if(auth) {
        const token = auth.split(' ')
        if(token[0] !== "Bearer"|| token.length !== 2) {
            throw new AppError('não autorizado', 401);
        }
        request.token = token[1]
        const tokenInfo = decode(token[1])
        if(tokenInfo === null) {
            throw new AppError('não autorizado', 401);
        }
        request.tokenInfo = tokenInfo
        return next()
    }
    throw new AppError('não autorizado', 401);
}

export default authRequired