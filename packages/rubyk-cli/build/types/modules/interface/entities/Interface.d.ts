import { GenericType } from '../../../modules/type/entities/GenericTypes';
import { Entity } from '../../../shared/core/entities/Entity';
import { InterfaceConfig } from '../../../types';
import { ConfigOptions } from '../../../modules/config/entities/Config';
import { Optional } from 'src/shared/types/Optional';
export interface InterfaceProps {
    name: string;
    pattern: string;
    extends: GenericType[];
    export: boolean;
    module: string;
    file: string;
    type: string;
}
export declare class Interface extends Entity<InterfaceProps> {
    static createByProps(props: Optional<InterfaceConfig, 'extends' | 'export' | 'pattern'>, options: ConfigOptions): Interface;
    static createByString(props: string, options: ConfigOptions): Interface;
    static create(props: InterfaceConfig | string, options: ConfigOptions): Interface;
    get name(): string;
    get pattern(): string;
    get extends(): GenericType[];
    get export(): boolean;
}
//# sourceMappingURL=Interface.d.ts.map