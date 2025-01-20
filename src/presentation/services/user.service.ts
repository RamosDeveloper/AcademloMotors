import { User } from "../../data";
import { CreateUserDTO, CustomError, UpdateUserDTO } from "../../domain";

export class UserService {
    constructor() {}

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

    async createUser(userData: CreateUserDTO) {
        const user = new User();

        user.name = userData.name;
        user.email = userData.email;
        user.password = userData.password;
        user.role = userData.role;

        try {
            return await user.save();            
        } catch (error) {
            throw CustomError.internalServer("Create user error");
        }
    }

    async updateUser(id: string, userData: UpdateUserDTO) {
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

    async deleteUser(id: string) {
        const user = await this.findUserById(id);

        if(user != null) {
            try {
                user.status = "disabled";

                return await user.save();                
            } catch (error) {
                throw CustomError.internalServer("Delete user error");
            }
        }else {
            throw CustomError.notFound(`User [${id}] does not exists`);
        }
    }
}