import { Repair } from "../../data";

export class RepairService {
    constructor() {}

    async findAllPendingMotosForRepair() {
        try {
            return await Repair.find({
                where: {
                    status: 'pending'
                }
            });
        } catch (error) {
            throw new Error("Find all pending motos for repair error");
        }
    }
}