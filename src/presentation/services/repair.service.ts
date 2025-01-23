import { RepairStatus, User } from "../../data";
import { Repair } from "../../data";
import { CreateRepairDTO, CustomError } from "../../domain";

export class RepairService {
    constructor() {}

    async findAllPendingMotosForRepair() {
        try {
            return await Repair.find({
                where: {
                    status: RepairStatus.PENDING
                },
                relations: ["user"]
            });
        } catch (error) {
            throw CustomError.internalServer("Find all pending motos for repair error");
        }
    }

    async findMotoForRepairById(id: string) {
        try {
            return await Repair.findOne({ 
                where: {
                    id
                },
                relations: ["user"]
            });
        } catch (error) {
            throw CustomError.internalServer("Find moto for repair by Id error");
        }
    }

    async findPendingMotoForRepairById(id: string) {
        try {
            return await Repair.findOne({ 
                where: {
                    id,
                    status: RepairStatus.PENDING
                },
                relations: ["user"]
            });
        } catch (error) {
            throw CustomError.internalServer("Find pending moto for repair by Id error");
        }
    }    

    async createRepair(repairData: CreateRepairDTO) {
        try {
            const user = await User.findOne({
                where: {
                    id: repairData.userId
                }
            });

            if(user != null) {
                const repair = new Repair();

                repair.date = repairData.date;
                repair.motorsNumber = repairData.motorsNumber;
                repair.description = repairData.description;
                repair.user = user;

                await repair.save();

                return repair;
            }else {
                throw CustomError.notFound(`The user [${repairData.userId}] does not exist`);
            }

        } catch (error) {
            throw CustomError.internalServer("Create repair error");
        }
    }

    async updateRepair(id: string) {
        const repair = await this.findPendingMotoForRepairById(id);

        try {
            if(repair != null) {
                repair.status = RepairStatus.COMPLETED;
                repair.save();

                return repair;
            }else {
                throw CustomError.notFound(`The repair [${id}] does not exist`);
            }
        } catch (error) {
            throw CustomError.internalServer("Update repair error");
        }
    }

    async deleteRepair(id: string) {
        const repair = await this.findMotoForRepairById(id);

        try {
            if(repair != null) {
                if(repair.status === 'completed') {
                    throw CustomError.badRequest('Error cannot cancel a complete repair');
                }

                repair.status = RepairStatus.CANCELLED;
                repair.save();

                return repair;
            }else {
                throw CustomError.notFound(`The repair [${id}] does not exist`);
            }
        } catch (error) {
            throw CustomError.internalServer("Delete repair error");
        }
    }    
}