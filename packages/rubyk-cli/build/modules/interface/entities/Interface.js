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
exports.Interface = void 0;
var PatternFactory_1 = require("../../../shared/utils/PatternFactory");
var GenericTypes_1 = require("../../../modules/type/entities/GenericTypes");
var Entity_1 = require("../../../shared/core/entities/Entity");
var Interface = /** @class */ (function (_super) {
    __extends(Interface, _super);
    function Interface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Interface.createByProps = function (props, options) {
        var _a, _b, _c, _d;
        return new Interface({
            name: props.name,
            pattern: (_a = props.pattern) !== null && _a !== void 0 ? _a : props.name,
            extends: (_c = (_b = props.extends) === null || _b === void 0 ? void 0 : _b.map(function (generic) { return GenericTypes_1.GenericType.create(generic, options); })) !== null && _c !== void 0 ? _c : [],
            export: (_d = props.export) !== null && _d !== void 0 ? _d : false,
            file: options.file,
            module: options.module,
            type: options.type
        });
    };
    Interface.createByString = function (props, options) {
        return Interface.createByProps({ name: props }, options);
    };
    Interface.create = function (props, options) {
        if (typeof props === 'string') {
            return Interface.createByString(props, options);
        }
        return Interface.createByProps(props, options);
    };
    Object.defineProperty(Interface.prototype, "name", {
        get: function () {
            return PatternFactory_1.PatterFactory.create(this.props.name, this.props);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interface.prototype, "pattern", {
        get: function () {
            return PatternFactory_1.PatterFactory.create(this.props.pattern, this.props);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interface.prototype, "extends", {
        get: function () {
            return this.props.extends;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interface.prototype, "export", {
        get: function () {
            return this.props.export;
        },
        enumerable: false,
        configurable: true
    });
    return Interface;
}(Entity_1.Entity));
exports.Interface = Interface;
