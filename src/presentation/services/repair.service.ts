import { User } from "../../data";
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

    async findMotoForRepairById(id: string) {
        try {
            return await Repair.findOne({ where: {
                id
            } });
        } catch (error) {
            throw new Error("Find moto for repair by Id error");
        }
    }

    async findPendingMotoForRepairById(id: string) {
        try {
            return await Repair.findOne({ where: {
                id,
                status: 'pending'
            } });
        } catch (error) {
            throw new Error("Find pending moto for repair by Id error");
        }
    }

    async createRepair(repairData: any) {
        try {
            const user = await User.findOne({
                where: {
                    id: repairData.userId
                }
            });

            if(user != null) {
                const repair = new Repair();

                repair.date = repairData.date;
                repair.user = user;

                await repair.save();

                return repair;
            }else {
                throw new Error(`The user [${repairData.userId}] does not exist`);
            }

        } catch (error) {
            throw new Error("Create repair error");
        }
    }

    async updateRepair(id: string) {
        const repair = await this.findPendingMotoForRepairById(id);

        try {
            if(repair != null) {
                repair.status = 'completed';
                repair.save();

                return repair;
            }else {
                throw new Error(`The repair [${id}] does not exist`);
            }
        } catch (error) {
            throw new Error("Update repair error");
        }
    }

    async deleteRepair(id: string) {
        const repair = await this.findPendingMotoForRepairById(id);

        try {
            if(repair != null) {
                repair.status = 'cancelled';
                repair.save();

                return repair;
            }else {
                throw new Error(`The repair [${id}] does not exist`);
            }
        } catch (error) {
            throw new Error("Delete repair error");
        }
    }    
}