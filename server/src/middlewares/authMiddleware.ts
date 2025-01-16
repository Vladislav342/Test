import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../exceptions/apiError';
const tokenService = require('../service/tokenService');

interface IUserData {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: IUserData;
        }
    }
}

module.exports = function (req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader: string = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}