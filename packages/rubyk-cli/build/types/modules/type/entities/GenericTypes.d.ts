import { Entity } from '../../../shared/core/entities/Entity';
import { GenericTypeConfig } from '../../../types';
import { ConfigOptions } from '../../../modules/config/entities/Config';
import { Optional } from 'src/shared/types/Optional';
export interface GenericTypeProps {
    name: string;
    generics: GenericType[];
    module: string;
    file: string;
    type: string;
}
export declare class GenericType extends Entity<GenericTypeProps> {
    static createByProps(props: Optional<GenericTypeConfig, 'generics'>, options: ConfigOptions): GenericType;
    static createByString(generic: string, options: ConfigOptions): any;
    static create(props: GenericTypeConfig | string, options: ConfigOptions): any;
    get name(): string;
    get generics(): GenericType[];
}
//# sourceMappingURL=GenericTypes.d.ts.map