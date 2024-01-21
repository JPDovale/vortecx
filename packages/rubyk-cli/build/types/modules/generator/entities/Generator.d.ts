import { Entity } from '../../../shared/core/entities/Entity';
import { GenericType } from '../../../modules/type/entities/GenericTypes';
import { GeneratorConfig } from '../../../types';
import { Method } from '../../../modules/method/entities/Method';
import { Import } from '../../../modules/imports/entities/Import';
import { Interface } from '../../../modules/interface/entities/Interface';
import { Type } from '../../../modules/type/entities/Type';
import { ConfigOptions } from '../../../modules/config/entities/Config';
import { Optional } from 'src/shared/types/Optional';
export interface GeneratorProps {
    name: string;
    pattern: string;
    module: string;
    filename: string;
    file: string;
    type: string;
    alias: string | null;
    imports: Import[];
    extends: GenericType[];
    implements: GenericType[];
    annotations: string[];
    methods: Method[];
    interfaces: Interface[];
    types: Type[];
    test: 'unit' | 'integration' | 'e2e' | 'disabled';
}
export declare class Generator extends Entity<GeneratorProps> {
    static create(config: Optional<GeneratorConfig, 'annotations' | 'extends' | 'filename' | 'implements' | 'imports' | 'methods' | 'pattern' | 'types' | 'interfaces' | 'test' | 'alias'>, opt: ConfigOptions): Generator;
    get name(): string;
    get filename(): string;
    get type(): string;
    get imports(): Import[];
    get extends(): GenericType[];
    get annotations(): string[];
    get methods(): Method[];
    get interfaces(): Interface[];
    get types(): Type[];
    get path(): string;
    get test(): "unit" | "integration" | "e2e" | "disabled";
    get implements(): GenericType[];
    get alias(): string;
}
//# sourceMappingURL=Generator.d.ts.map