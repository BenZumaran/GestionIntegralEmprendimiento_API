import  express, { Router } from 'express';
import path from 'node:path';

interface Options {
    port: number; 
    routes: Router;
    public_path?: string;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(
        options: Options
    ){
        const { port, public_path = 'public', routes } = options;
        this.port =  port; 
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start(){



        //* Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        //* Routes
        this.app.use(this.routes);

        //* Public folder
        this.app.use(express.static(this.publicPath));
        //* SPA
        this.app.get('*', (req, res) => {
            res.sendStatus(400);
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}