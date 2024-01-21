import { Entity } from '../../../shared/core/entities/Entity';
import { GenericType } from './GenericTypes';
import { TypeConfig } from '../../../types';
import { ConfigOptions } from '../../../modules/config/entities/Config';
import { Optional } from '../../../shared/types/Optional';
export interface TypeProps {
    name: string;
    pattern: string;
    export: boolean;
    receive: GenericType[];
    module: string;
    file: string;
    type: string;
}
export declare class Type extends Entity<TypeProps> {
    static createByProps(props: Optional<TypeConfig, 'export' | 'pattern' | 'receive'>, options: ConfigOptions): Type;
    static createByString(props: string, options: ConfigOptions): Type;
    static create(props: TypeConfig | string, options: ConfigOptions): Type;
    get name(): string;
    get pattern(): string;
    get export(): boolean;
    get receive(): GenericType[];
}
//# sourceMappingURL=Type.d.ts.map