import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/user.service";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class UserRoutes {

    static get routes(): Router {
        const router = Router();
        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL            
        );
        const userService = new UserService(emailService);
        const userController = new UserController(userService);

        router.post("/", userController.createUser);
        router.post("/login", userController.loginUser);

        router.use(AuthMiddleware.protect);

        router.get("/", userController.findAllUsers);
        router.get("/:id", userController.findUserById);

        router.patch("/:id", userController.updateUser);

        router.delete("/:id", userController.deleteUser);

        return router;
    }

}