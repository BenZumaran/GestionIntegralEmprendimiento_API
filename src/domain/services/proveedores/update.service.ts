export class UpdateProveedor {
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

        this.razonSocial && (returnObj.razonSocial = this.razonSocial);
        this.tipo && (returnObj.tipo = this.tipo);
        this.telefono && (returnObj.telefono = this.telefono);
        this.direccion && (returnObj.direccion = this.direccion);
        this.cuentaCorriente && (returnObj.cuentaCorriente = this.cuentaCorriente);

        return returnObj;

    }

    static create( props: {[key: string]: any} ): [string?, UpdateProveedor?] {
        const { ruc, razonSocial, telefono, direccion, tipo, cuentaCorriente } = props;
        if (!ruc) return ['ruc is required', undefined];

        return [undefined, new UpdateProveedor(ruc, razonSocial, telefono, direccion, tipo, cuentaCorriente)];
    }
}