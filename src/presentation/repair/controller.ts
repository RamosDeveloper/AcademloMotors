import { Request, Response } from "express";

export class RepairController {
    constructor() {}

    findAllPendingMotosForRepair = async (req: Request, res: Response) => {
        return res.status(201).json({
            motosToRepair: [1,2,3]
        });
    };
}