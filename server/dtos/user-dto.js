module.exports = class UserDto {
    email;
    id;
    firstname;
    lastname;
    isactivated;

    constructor(model){
        this.email = model.email;
        this.id = model.id;
        this.firstname = model.firstname;
        this.lastname = model.lastname;
        this.isactivated = model.isactivated;
    }
}