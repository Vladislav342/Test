interface IApiError {
    status: string;
    errors: string;
}
export class ApiError extends Error implements IApiError {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User is not authorized');
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}
