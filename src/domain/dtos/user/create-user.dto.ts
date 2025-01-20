import { regularExp } from "../../../config";

export class CreateUserDTO {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public role: 'employee' | 'client'
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateUserDTO?] {
        const { name, email, password, role } = object;

        if (!name) return ["Missing name"];
        if (!email) return ["Missing email"];
        if (!regularExp.email.test(email)) return ["Invalid Email"];
        if (!password) return ["Missing password"];
        if (!regularExp.password.test(password)) {
            return [
                "The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, and one special character ",
            ];             
        }
        if (!role) return ["Missing role"];
        if (!regularExp.role.test(role)) return ["The role can only be client or employee"];
       

        return [
            undefined,
            new CreateUserDTO(name, email, password, role),
          ];        
    }
}