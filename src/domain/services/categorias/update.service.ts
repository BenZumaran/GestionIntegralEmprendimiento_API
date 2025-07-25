

export class UpdateCategoria {
    constructor(
        public readonly id: number,
        public readonly nombre?: string,
    ) {}

    get values(){

        const returnObj: {[key:string]:any} = {}

        this.nombre && (returnObj.nombre = this.nombre);

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, UpdateCategoria?] {
        const { id, nombre } = props;
        
        if(!id || isNaN(id)) return ['id must be a valid number'];
        if (!nombre) return ['nombre es requerido', undefined];

        return [undefined, new UpdateCategoria(id, nombre)];
    }
}