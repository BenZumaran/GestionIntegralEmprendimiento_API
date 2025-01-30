export class CreateCategoria {
    constructor(
        public readonly nombre: string,
    ) {}

    static create( props: {[key: string]: any} ): [string?, CreateCategoria?] {
        const { nombre } = props;
        if (!nombre) return ['nombre is required', undefined];
        return [undefined, new CreateCategoria(nombre)];
    }
}