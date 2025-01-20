import { regularExp } from "../../../config";

export class CreateRepairDTO {
    constructor(
        public date: Date,
        public userId: string
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateRepairDTO?] {
        const { date, userId } = object;

        if (!date) return ["Missing date"];
        if (!userId) return ["Missing userId"];
        if (!regularExp.uuid.test(userId)) return ["Invalid UUID"];        

        return [
            undefined,
            new CreateRepairDTO(date, userId),
        ];        
    }
}