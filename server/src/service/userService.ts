const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const tokenService = require('./tokenService');
const UserDto = require('../dto/UserDto');
const ApiError = require('../exceptions/apiError');

class UserService {
    async registration(email: string, password: string) {
        const candidate: string = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`This email addres ${email} is already existed`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await UserModel.create({ email, password: hashPassword, activationLink });

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest(`This email addres ${email} is not found`);
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Invalid password');
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedErrpr();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }
}

module.exports = new UserService();