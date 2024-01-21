export declare class UniqueId {
    private _value;
    protected constructor(value: string);
    static generate(): UniqueId;
    static reconstitute(value: string): UniqueId;
    get value(): string;
    toString(): string;
    equals(other: UniqueId): boolean;
}
//# sourceMappingURL=UniqueId.d.ts.map