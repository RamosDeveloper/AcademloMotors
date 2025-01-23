import { regularExp } from "../../../config";

export class LoginUserDTO {
    constructor(
        public email: string,
        public password: string
    ) {}

    static create(object: { [key: string]: any }): [string?, LoginUserDTO?] {
        const {  email, password } = object;

        if (!email) return ["Missing email"];
        if (!regularExp.email.test(email)) return ["Invalid Email"];
        if (!password) return ["Missing password"];
                
        return [
            undefined,
            new LoginUserDTO(email, password),
        ];
    }
}