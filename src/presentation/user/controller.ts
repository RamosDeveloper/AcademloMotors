import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDTO, UpdateUserDTO, CustomError, LoginUserDTO } from "../../domain";

export class UserController {
    constructor(private readonly _userService: UserService) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        console.log(error);
        return res.status(500).json({ message: "Internal server error 🧨" });
    };

    findAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await this._userService.findAllUsers();

            return res.status(200).json(users);            
        } catch (error: unknown) {
            return this.handleError(error, res);
        }
    };

    findUserById = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const user = await this._userService.findUserById(id);

            return res.status(200).json(user);
        } catch (error: unknown) {
            return this.handleError(error, res);
        }
    };

    loginUser = async (req: Request, res: Response) => {
        const [errorLoginUser, loginUserDto] = LoginUserDTO.create(req.body);

        if (errorLoginUser) return res.status(422).json({ message: errorLoginUser });
        
        try {
            const loginData = await this._userService.loginUser(loginUserDto!);

            return res.status(200).json(loginData);
        } catch (error: unknown) {
            return this.handleError(error, res);
        }
    };

    createUser = async (req: Request, res: Response) => {
        try {
           const [errorCreateUser, createUserDto] = CreateUserDTO.create(req.body);

           if(errorCreateUser) return res.status(422).json({message : errorCreateUser});

           const createUserResponse = await this._userService.createUser(createUserDto!);

           return res.status(201).json(createUserResponse);
        } catch (error: unknown) {
            return this.handleError(error, res);
        }
    };

    updateUser = async (req: Request, res: Response) => {
        try {
            const [errorUpdateUser, updateUserDto] = UpdateUserDTO.create(req.body);

            if(errorUpdateUser) return res.status(422).json({message : errorUpdateUser});

            const {id} = req.params;
            const sessionUserId = req.body.sessionUser.id;
            const updateUserResponse = await this._userService.updateUser(id, updateUserDto!, sessionUserId);

            return res.status(200).json(updateUserResponse);
        } catch (error: unknown) {
            return this.handleError(error, res);
        }
    };

    deleteUser = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const sessionUserId = req.body.sessionUser.id;
            const deleteUserResponse = await this._userService.deleteUser(id, sessionUserId);

            return res.status(204).json(deleteUserResponse);            
        } catch (error: unknown) {
            return this.handleError(error, res);
        }
    };
}