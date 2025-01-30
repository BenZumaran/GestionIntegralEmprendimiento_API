export class CreateTipo {
    constructor(
        public readonly nombre: string,
    ) {}

    static create( props: {[key: string]: any} ): [string?, CreateTipo?] {
        const { nombre } = props;

        if (!nombre) return ['nombre es requerido', undefined];
        
        return [undefined, new CreateTipo(nombre)];
    }
}