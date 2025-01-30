

export class UpdateCategoria {
    constructor(
        public readonly id: number,
        public readonly text?: string,
    ) {}

    get values(){

        const returnObj: {[key:string]:any} = {}

        this.text && (returnObj.text = this.text);

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, UpdateCategoria?] {
        const { id, nombre } = props;
        
        if(!id || isNaN(id)) return ['id must be a valid number'];
        if (!nombre) return ['nombre es requerido', undefined];

        return [undefined, new UpdateCategoria(id, nombre)];
    }
}