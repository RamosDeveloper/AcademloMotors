import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDTO, UpdateUserDTO } from "../../domain";

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
           const [errorCreateUser, createUserDto] = CreateUserDTO.create(req.body);

           if(errorCreateUser) return res.status(422).json({message : errorCreateUser});

           const createUserResponse = await this._userService.createUser(createUserDto!);

           return res.status(201).json(createUserResponse);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });            
        }
    };

    updateUser = async (req: Request, res: Response) => {
        try {
            const [errorUpdateUser, updateUserDto] = UpdateUserDTO.create(req.body);

            if(errorUpdateUser) return res.status(422).json({message : errorUpdateUser});

            const {id} = req.params;
            const updateUserResponse = await this._userService.updateUser(id, updateUserDto!);

            return res.status(200).json(updateUserResponse);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });              
        }
    };

    deleteUser = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const deleteUserResponse = await this._userService.deleteUser(id);

            return res.status(204).json(deleteUserResponse);            
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });             
        }
    };
}