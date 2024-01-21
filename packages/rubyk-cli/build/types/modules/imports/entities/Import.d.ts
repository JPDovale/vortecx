import { Entity } from '../../../shared/core/entities/Entity';
import { ImportConfig } from '../../../types';
import { ConfigOptions } from 'src/modules/config/entities/Config';
export interface ImportProps {
    imports: string[];
    from: string;
    module: string;
    type: string;
    file: string;
    name: string;
}
export declare class Import extends Entity<ImportProps> {
    static create(props: ImportConfig, options: ConfigOptions): Import;
    get imports(): string[];
    get from(): string;
}
//# sourceMappingURL=Import.d.ts.map