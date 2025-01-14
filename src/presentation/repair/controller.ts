import { Request, Response } from "express";
import { RepairService } from "../services/repair.service";


export class RepairController {
    constructor(private readonly _repairService: RepairService) {}

    findAllPendingMotosForRepair = async (req: Request, res: Response) => {
        try {
            const pendingMotosForRepair = await this._repairService.findAllPendingMotosForRepair();

            return res.status(200).json(pendingMotosForRepair);
        } catch (error) {   
            return res.status(500).json({
                message: "Internal server error",
                error
            });            
        }
    };

    findPendingMotoForRepairById = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const pendingMotoForRepair = await this._repairService.findPendingMotoForRepairById(id);

            return res.status(200).json(pendingMotoForRepair);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });            
        }
    };

    createRepair = async (req: Request, res: Response) => {
        try {
            const createRepairResponse = await this._repairService.createRepair(req.body);

            return res.status(201).json(createRepairResponse);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });            
        }
    };

    updateRepair = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const updateRepairResponse = await this._repairService.updateRepair(id);

            return res.status(200).json(updateRepairResponse);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });              
        }
    };

    deleteRepair = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const deleteRepairResponse = await this._repairService.deleteRepair(id);

            return res.status(204).json(deleteRepairResponse);
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error
            });              
        }
    };    
}