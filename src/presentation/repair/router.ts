import { Router } from "express";
import { RepairController } from "./controller";
import { RepairService } from "../services/repair.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserRole } from "../../data";

export class RepairRoutes {
    
    static get routes(): Router {
        const router = Router();
        const repairService = new RepairService();
        const repairController = new RepairController(repairService);

        router.use(AuthMiddleware.protect);

        router.post("/", repairController.createRepair); 
        
        router.use(AuthMiddleware.restrictTo(UserRole.EMPLOYEE));
        
        router.get("/", repairController.findAllPendingMotosForRepair);
        router.get("/:id", repairController.findPendingMotoForRepairById);

        router.patch("/:id", repairController.updateRepair);
        router.delete("/:id", repairController.deleteRepair);

        return router;

    }
}