import { Generator } from '../../../modules/generator/entities/Generator';
import { Entity } from '../../../shared/core/entities/Entity';
import { Config as ConfigType } from 'src/types';
export interface ConfigProps {
    generators: Generator[];
}
export interface ConfigOptions {
    module: string;
    file: string;
    type: string;
}
export declare class Config extends Entity<ConfigProps> {
    static create(config: ConfigType, options: ConfigOptions): Config;
    findGenerator(type: string): Generator;
}
//# sourceMappingURL=Config.d.ts.map