import { regularExp } from "../../../config";

export class CreateRepairDTO {
    constructor(
        public date: Date,
        public motorsNumber: number,
        public description: string,
        public userId: string
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateRepairDTO?] {
        const { date, motorsNumber, description, userId } = object;

        if (!date) return ["Missing date"];
        if (!motorsNumber) return ["Missing motors number"];
        if (!description) return ["Missing description"];
        if (!userId) return ["Missing userId"];
        if (!regularExp.uuid.test(userId)) return ["Invalid UUID"];        

        return [
            undefined,
            new CreateRepairDTO(date, motorsNumber, description, userId),
        ];        
    }
}