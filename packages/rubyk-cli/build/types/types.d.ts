export {};
export declare type TypeConfig = {
    name: string;
    pattern?: string;
    export?: boolean;
    receive?: GenericTypeConfig[] | string[];
};
export declare type InterfaceConfig = {
    name: string;
    pattern?: string;
    extends?: GenericTypeConfig[];
    export?: boolean;
};
export declare type MethodConfig = {
    name: string;
    annotations?: string[];
    properties?: {
        annotation?: string;
        name: string;
        type: GenericTypeConfig[] | string[];
    }[];
    returns?: {
        type: GenericTypeConfig[] | string[];
    };
};
export declare type GenericTypeConfig = {
    name: string;
    generics?: GenericTypeConfig[] | string[];
};
export declare type ImportConfig = {
    imports: string[];
    from: string;
};
export declare type GeneratorConfig = {
    name: string;
    pattern?: string;
    filename?: string;
    type: string;
    alias?: string;
    imports?: ImportConfig[];
    extends?: GenericTypeConfig[] | string[];
    implements?: GenericTypeConfig[] | string[];
    annotations?: string[];
    methods?: MethodConfig[];
    interfaces?: InterfaceConfig[] | string[];
    types?: TypeConfig[] | string[];
    test?: 'unit' | 'integration' | 'e2e' | 'disabled';
};
export declare type Config = {
    generators: GeneratorConfig[];
};
//# sourceMappingURL=types.d.ts.map