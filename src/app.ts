import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import { PostgresDatabase } from "./data";
import { envs } from "./config";

async function main () {
    
    const postgres = new PostgresDatabase({
        username: envs.DB_USERNAME,
        password: envs.DB_PASSWORD,
        host: envs.DB_HOST,
        database: envs.DB_NAME,
        port: envs.DB_PORT
    });

    await postgres.connect();

    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    });

    await server.start();
}



main();

