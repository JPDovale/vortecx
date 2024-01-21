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
exports.GenericType = void 0;
var PatternFactory_1 = require("../../../shared/utils/PatternFactory");
var Entity_1 = require("../../../shared/core/entities/Entity");
var GenericType = /** @class */ (function (_super) {
    __extends(GenericType, _super);
    function GenericType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GenericType.createByProps = function (props, options) {
        var _a, _b;
        return new GenericType({
            generics: (_b = (_a = props.generics) === null || _a === void 0 ? void 0 : _a.map(function (generic) { return GenericType.create(generic, options); })) !== null && _b !== void 0 ? _b : [],
            name: props.name,
            file: options.file,
            module: options.module,
            type: options.type
        });
    };
    GenericType.createByString = function (generic, options) {
        return GenericType.create({ name: generic, generics: [] }, options);
    };
    GenericType.create = function (props, options) {
        if (typeof props === 'string') {
            return GenericType.createByString(props, options);
        }
        return GenericType.createByProps(props, options);
    };
    Object.defineProperty(GenericType.prototype, "name", {
        get: function () {
            return PatternFactory_1.PatterFactory.create(this.props.name, this.props);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GenericType.prototype, "generics", {
        get: function () {
            return this.props.generics;
        },
        enumerable: false,
        configurable: true
    });
    return GenericType;
}(Entity_1.Entity));
exports.GenericType = GenericType;
