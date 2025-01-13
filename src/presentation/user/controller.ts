import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    constructor(private readonly _userService: UserService) {}

    findAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await this._userService.findAllUsers();

            return res.status(201).json({users});            
        } catch (error) {
            return res.status(500).json({
                message: "Finding all Users",
                error
            })
        }
    };
}