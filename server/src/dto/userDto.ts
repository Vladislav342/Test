interface IUserDto{
    email: string,
    id: string
}

export class UserDto implements IUserDto {
    email;
    id;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
    }
}
