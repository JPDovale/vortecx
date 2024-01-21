"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Import = void 0;
var PatternFactory_1 = require("../../../shared/utils/PatternFactory");
var Entity_1 = require("../../../shared/core/entities/Entity");
var Import = /** @class */ (function (_super) {
    __extends(Import, _super);
    function Import() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Import.create = function (props, options) {
        return new Import({
            imports: props.imports,
            from: props.from,
            file: options.file,
            module: options.module,
            type: options.type,
            name: ''
        });
    };
    Object.defineProperty(Import.prototype, "imports", {
        get: function () {
            var _this = this;
            return this.props.imports.map(function (i) { return PatternFactory_1.PatterFactory.create(i, _this.props); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Import.prototype, "from", {
        get: function () {
            return PatternFactory_1.PatterFactory.create(this.props.from, this.props);
        },
        enumerable: false,
        configurable: true
    });
    return Import;
}(Entity_1.Entity));
exports.Import = Import;
