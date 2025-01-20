import { Request, Response } from "express";
import { RepairService } from "../services/repair.service";
import { CreateRepairDTO, CustomError } from "../../domain";

export class RepairController {
    constructor(private readonly _repairService: RepairService) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        console.log(error);
        return res.status(500).json({ message: "Internal server error 🧨" });
    };

    findAllPendingMotosForRepair = async (req: Request, res: Response) => {
        try {
            const pendingMotosForRepair = await this._repairService.findAllPendingMotosForRepair();

            return res.status(200).json(pendingMotosForRepair);
        } catch (error: unknown) {
            return this.handleError(error, res);
        }
    };

    findPendingMotoForRepairById = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const pendingMotoForRepair = await this._repairService.findPendingMotoForRepairById(id);

            return res.status(200).json(pendingMotoForRepair);
        } catch (error: unknown) {
            return this.handleError(error, res);
        }
    };

    createRepair = async (req: Request, res: Response) => {
        try {
            const [errorCreateRepair, createRepairDto] = CreateRepairDTO.create(req.body);

            if(errorCreateRepair) return res.status(422).json({message : errorCreateRepair});

            const createRepairResponse = await this._repairService.createRepair(createRepairDto!);

            return res.status(201).json(createRepairResponse);
        } catch (error: unknown) {
            return this.handleError(error, res);
        }
    };

    updateRepair = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const updateRepairResponse = await this._repairService.updateRepair(id);

            return res.status(200).json(updateRepairResponse);
        } catch (error: unknown) {
            return this.handleError(error, res);
        }
    };

    deleteRepair = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const deleteRepairResponse = await this._repairService.deleteRepair(id);

            return res.status(204).json(deleteRepairResponse);
        } catch (error: unknown) {
            return this.handleError(error, res);
        }
    };    
}