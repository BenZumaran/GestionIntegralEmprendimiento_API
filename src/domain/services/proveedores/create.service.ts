export class CreateProveedor {
    constructor(
        public readonly ruc: string,
        public readonly razonSocial: string,
        public readonly tipo: number,
        public readonly telefono?: string,
        public readonly direccion?: string,
        public readonly cuentaCorriente?: string,
    ) {}

    get values(){
        const returnObj:{[key:string]:any} = {};

        returnObj.ruc = this.ruc;
        returnObj.razonSocial = this.razonSocial;
        returnObj.tipo = this.tipo;
        this.telefono && (returnObj.telefono = this.telefono);
        this.direccion && (returnObj.direccion = this.direccion);
        this.cuentaCorriente && (returnObj.cuentaCorriente = this.cuentaCorriente);

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, CreateProveedor?] {
        const { ruc, razonSocial, telefono, direccion, tipo, cuentaCorriente } = props;
        if (!ruc) return ['ruc is required', undefined];
        if (!razonSocial) return ['razonSocial is required', undefined];
        if (!tipo) return ['tipo is required', undefined];

        return [undefined, new CreateProveedor(ruc, razonSocial, tipo, telefono, direccion, cuentaCorriente)];
    }
}