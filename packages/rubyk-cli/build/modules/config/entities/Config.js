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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
var Generator_1 = require("../../../modules/generator/entities/Generator");
var Entity_1 = require("../../../shared/core/entities/Entity");
var Config = /** @class */ (function (_super) {
    __extends(Config, _super);
    function Config() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Config.create = function (config, options) {
        var _a;
        var opt = __assign(__assign({}, options), { file: (_a = options.file) !== null && _a !== void 0 ? _a : 'index' });
        return new Config({
            generators: config.generators.map(function (gen) { return Generator_1.Generator.create(gen, opt); })
        });
    };
    Config.prototype.findGenerator = function (type) {
        var generator = this.props.generators.find(function (generator) {
            var _a;
            return generator.type.toLocaleLowerCase() === type.toLocaleLowerCase() ||
                ((_a = generator.alias) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === type.toLocaleLowerCase();
        });
        return generator !== null && generator !== void 0 ? generator : null;
    };
    return Config;
}(Entity_1.Entity));
exports.Config = Config;
