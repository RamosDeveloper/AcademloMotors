import { encriptAdapter, JwtAdapter, protectAccountOwner } from "../../config";
import { User, UserRole, UserStatus } from "../../data";
import { CreateUserDTO, CustomError, LoginUserDTO, UpdateUserDTO } from "../../domain";
import { EmailService } from "./email.service";

export class UserService {
    constructor(private readonly _emailService: EmailService) {}

    async findAllUsers() {
        try {
            return await User.find();
        } catch (error) {
            throw CustomError.internalServer("Find all users error");
        }
    }

    async findUserById(id: string) {
        try {
            return await User.findOne({
                where: { id }
            });
        } catch (error) {
            throw CustomError.internalServer("Find user by Id error");
        }
    }

    async findUserByEmail(email: string) {
        try {
            const user = await User.findOne({
                where: {
                    email: email,
                    status: UserStatus.AVAILABLE
                }
            });

            if(!user) {
                throw CustomError.notFound(`User with email: [${email}] does not exists`);
            }

            return user;
        } catch (error) {
            throw CustomError.internalServer("Find user by email error");
        }
    }

    async sendEmailValidationLink(email: string) {
        const mockToken = "ieuehdygdtegeh";
        const link = `http://localhost:3000/api/v1/users/validate-email/${mockToken}`;
        const html = `
            <h1>Validate your email</h1>
            <p>Click on the following link to validate your email</p>
            <a href="${link}">Validate your email: ${email}</a>
        `;

        const isSent = await this._emailService.sendEmail({
            to: email,
            subject: 'Validate your email',
            htmlBody: html
        });

        if(!isSent) {
            throw CustomError.internalServer("Error sending validation email link");
        }

        return true;
    }

    async loginUser(loginData: LoginUserDTO) {
        const user = await this.findUserByEmail(loginData.email);
        const isMatching = encriptAdapter.compare(loginData.password, user.password);
        if(!isMatching) {
            throw CustomError.unAuthorized("Invalid Credentials");
        }

        const token = await JwtAdapter.generateToken({id: user.id});
        if(!token) {
            throw CustomError.internalServer("Error while creating JWT");
        }

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                role: user.role                
            }
        }
    }

    async createUser(userData: CreateUserDTO) {
        const user = new User();

        user.name = userData.name;
        user.email = userData.email;
        user.password = userData.password;
        user.role = userData.role === UserRole.EMPLOYEE ? UserRole.EMPLOYEE : UserRole.CLIENT;

        try {
            const dbUser = await user.save();

            await this.sendEmailValidationLink(dbUser.email);

            return {
                id: dbUser.id,
                name: dbUser.name,
                role: dbUser.role
            }
        } catch (error: any) {
            if(error.code === '23505') {
                throw CustomError.badRequest(`User with email: [${userData.email}] already exists`);
            }

            throw CustomError.internalServer("Create user error");
        }
    }

    async updateUser(id: string, userData: UpdateUserDTO, sessionUserId: string) {
        const isOwner = protectAccountOwner(id, sessionUserId);

        if(!isOwner) {
            throw CustomError.forbiden("You are not the account owner");
        }

        const user = await this.findUserById(id);

        if(user != null) {
            try {
                user.name = userData.name;
                user.email = userData.email;

                return await user.save();
            } catch (error) {
                throw CustomError.internalServer("Update user error");
            }
        }else {
            throw CustomError.notFound(`User [${id}] does not exists`);
        }
    }

    async deleteUser(id: string, sessionUserId: string) {
        const isOwner = protectAccountOwner(id, sessionUserId);

        if(!isOwner) {
            throw CustomError.forbiden("You are not the account owner");
        }
                
        const user = await this.findUserById(id);

        if(user != null) {
            try {
                user.status = UserStatus.DISABLED;

                return await user.save();                
            } catch (error) {
                throw CustomError.internalServer("Delete user error");
            }
        }else {
            throw CustomError.notFound(`User [${id}] does not exists`);
        }
    }
}