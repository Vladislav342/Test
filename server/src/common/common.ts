import { Request, Response, NextFunction } from 'express';
const userService = require('../service/userService');



class CommonUtils {
    async incomingData(req: Request, res: Response,  nameOfReq) {
        const { email, password } = req.body;
        const userData = await userService[`${nameOfReq}`](email, password);
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true });
        return res.json(userData);
    }

}


module.exports = new CommonUtils();