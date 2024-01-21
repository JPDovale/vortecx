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
exports.Type = void 0;
var Entity_1 = require("../../../shared/core/entities/Entity");
var GenericTypes_1 = require("./GenericTypes");
var PatternFactory_1 = require("../../..//shared/utils/PatternFactory");
var Type = /** @class */ (function (_super) {
    __extends(Type, _super);
    function Type() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Type.createByProps = function (props, options) {
        var _a, _b, _c, _d;
        return new Type({
            name: props.name,
            pattern: (_a = props.pattern) !== null && _a !== void 0 ? _a : props.name,
            export: (_b = props.export) !== null && _b !== void 0 ? _b : false,
            receive: (_d = (_c = props.receive) === null || _c === void 0 ? void 0 : _c.map(function (generic) { return GenericTypes_1.GenericType.create(generic, options); })) !== null && _d !== void 0 ? _d : [],
            file: options.file,
            module: options.module,
            type: options.type
        });
    };
    Type.createByString = function (props, options) {
        return Type.createByProps({ name: props }, options);
    };
    Type.create = function (props, options) {
        if (typeof props === 'string') {
            return Type.createByString(props, options);
        }
        return Type.createByProps(props, options);
    };
    Object.defineProperty(Type.prototype, "name", {
        get: function () {
            return PatternFactory_1.PatterFactory.create(this.props.name, this.props);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Type.prototype, "pattern", {
        get: function () {
            return PatternFactory_1.PatterFactory.create(this.props.pattern, this.props);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Type.prototype, "export", {
        get: function () {
            return this.props.export;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Type.prototype, "receive", {
        get: function () {
            return this.props.receive;
        },
        enumerable: false,
        configurable: true
    });
    return Type;
}(Entity_1.Entity));
exports.Type = Type;
