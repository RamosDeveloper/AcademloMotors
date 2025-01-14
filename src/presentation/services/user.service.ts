import { User } from "../../data";

export class UserService {
    constructor() {}

    async findAllUsers() {
        try {
            return await User.find();
        } catch (error) {
            throw new Error("Find all users error");
        }
    }

    async findUserById(id: string) {
        try {
            return await User.findOne({
                where: { id }
            });
        } catch (error) {
            throw new Error("Find user by Id error");
        }
    }

    async createUser(userData: any) {
        const user = new User();

        user.name = userData.name;
        user.email = userData.email;
        user.password = userData.password;
        user.role = userData.role;

        try {
            return await user.save();            
        } catch (error) {
            throw new Error("Create user error");
        }
    }

    async updateUser(id: string, userData: any) {
        const user = await this.findUserById(id);

        if(user != null) {
            try {
                user.name = userData.name;
                user.email = userData.email;

                return await user.save();
            } catch (error) {
                throw new Error("Update user error");
            }
        }else {
            throw new Error(`User [${id}] does not exists`);
        }
    }

    async deleteUser(id: string) {
        const user = await this.findUserById(id);

        if(user != null) {
            try {
                user.status = "disabled";

                return await user.save();                
            } catch (error) {
                throw new Error("Delete user error");
            }
        }else {
            throw new Error(`User [${id}] does not exists`);
        }
    }
}