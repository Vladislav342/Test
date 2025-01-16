interface IUserDto{
    email: string,
    id: string,
    isActivated: boolean;
}

export class UserDto implements IUserDto {
    email;
    id;
    isActivated;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}
