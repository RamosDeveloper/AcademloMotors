import { Request, Response } from "express";
import { RepairService } from "../services/repair.service";

export class RepairController {
    constructor(private readonly _repairService: RepairService) {}

    findAllPendingMotosForRepair = async (req: Request, res: Response) => {
        try {
            
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });            
        }
    };
}