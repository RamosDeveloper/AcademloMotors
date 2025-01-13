import { Router } from "express";
import { RepairController } from "./controller";

export class RepairRoutes {
    
    static get routes(): Router {
        const router = Router();
        const repairController = new RepairController();

        router.get("/", repairController.findAllPendingMotosForRepair);        

        return router;

    }
}