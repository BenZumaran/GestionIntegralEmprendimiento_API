import { envs } from "./config/envs";
import { Server } from "./domain/presentation/server";
import { AppRoutes } from "./domain/repository/routes";


(async => {
    main();
})();


function main() {
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    });
    server.start();
}