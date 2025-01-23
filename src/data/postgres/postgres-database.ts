import { DataSource } from "typeorm";
import { User } from "./models/user.model";
import { Repair } from "./models/repair.model";


interface IPostgresDatabaseProps {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export class PostgresDatabase {
    public datasource: DataSource;

    constructor(options: IPostgresDatabaseProps) {
        this.datasource = new DataSource({
            type: 'postgres',
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
            entities: [User, Repair],
            logging: true,
            synchronize: true
        });
    }

    async connect() {
        try {
            await this.datasource.initialize();
            console.log(`The database is connected 👌`);
        } catch (error) {
            console.log(error);
        }
    }
}