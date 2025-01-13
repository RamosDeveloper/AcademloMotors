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
}