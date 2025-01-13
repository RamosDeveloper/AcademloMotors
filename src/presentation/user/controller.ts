import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    constructor(private readonly _userService: UserService) {}

    findAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await this._userService.findAllUsers();

            return res.status(200).json(users);            
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });
        }
    };

    findUserById = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const user = await this._userService.findUserById(id);

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });            
        }
    };

    createUser = async (req: Request, res: Response) => {
        try {
           const createUserResponse = await this._userService.createUser(req.body);

           return res.status(201).json(createUserResponse);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });            
        }
    };
}