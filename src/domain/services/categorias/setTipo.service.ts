export class SetTipoToCategoria {
    constructor(
        public readonly tipo: number,
        public readonly categoria: number,
    ) {}

    static create( props: {[key: string]: any} ): [string?, SetTipoToCategoria?] {
        const { tipo , categoria } = props;
        if (!tipo) return ['tipo is required', undefined];
        if (!categoria) return ['categoria is required', undefined];
        return [undefined, new SetTipoToCategoria(tipo, categoria)];
    }
}