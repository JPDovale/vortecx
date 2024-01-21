import { ConfigOptions } from 'src/modules/config/entities/Config';
import { GenericType } from '../../../modules/type/entities/GenericTypes';
import { Entity } from '../../../shared/core/entities/Entity';
import { MethodConfig } from '../../../types';
import { Optional } from 'src/shared/types/Optional';
export interface MethodProps {
    name: string;
    annotations: string[];
    properties: {
        annotation: string;
        name: string;
        type: GenericType[];
    }[];
    returns: {
        type: GenericType[];
    };
    module: string;
    file: string;
    type: string;
}
export declare class Method extends Entity<MethodProps> {
    static create(props: Optional<MethodConfig, 'annotations' | 'properties'>, options: ConfigOptions): Method;
    get name(): string;
    get annotations(): string[];
    get properties(): {
        annotation: string;
        name: string;
        type: GenericType[];
    }[];
    get returns(): {
        type: GenericType[];
    };
}
//# sourceMappingURL=Method.d.ts.map