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
exports.Method = void 0;
var GenericTypes_1 = require("../../../modules/type/entities/GenericTypes");
var Entity_1 = require("../../../shared/core/entities/Entity");
var PatternFactory_1 = require("../../../shared/utils/PatternFactory");
var Method = /** @class */ (function (_super) {
    __extends(Method, _super);
    function Method() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Method.create = function (props, options) {
        var _a, _b, _c, _d, _e, _f;
        return new Method({
            name: props.name,
            annotations: (_a = props.annotations) !== null && _a !== void 0 ? _a : [],
            properties: (_c = (_b = props.properties) === null || _b === void 0 ? void 0 : _b.map(function (prop) {
                var _a, _b;
                return ({
                    annotation: prop.annotation,
                    name: prop.name,
                    type: (_b = (_a = prop.type) === null || _a === void 0 ? void 0 : _a.map(function (generic) { return GenericTypes_1.GenericType.create(generic, options); })) !== null && _b !== void 0 ? _b : []
                });
            })) !== null && _c !== void 0 ? _c : [],
            returns: {
                type: (_f = (_e = (_d = props.returns) === null || _d === void 0 ? void 0 : _d.type) === null || _e === void 0 ? void 0 : _e.map(function (generic) { return GenericTypes_1.GenericType.create(generic, options); })) !== null && _f !== void 0 ? _f : []
            },
            module: options.module,
            file: options.file,
            type: options.type
        });
    };
    Object.defineProperty(Method.prototype, "name", {
        get: function () {
            return PatternFactory_1.PatterFactory.create(this.props.name, this.props);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Method.prototype, "annotations", {
        get: function () {
            return this.props.annotations;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Method.prototype, "properties", {
        get: function () {
            return this.props.properties;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Method.prototype, "returns", {
        get: function () {
            return this.props.returns;
        },
        enumerable: false,
        configurable: true
    });
    return Method;
}(Entity_1.Entity));
exports.Method = Method;
