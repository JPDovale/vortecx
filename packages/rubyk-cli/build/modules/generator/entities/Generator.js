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
exports.Generator = void 0;
var Entity_1 = require("../../../shared/core/entities/Entity");
var GenericTypes_1 = require("../../../modules/type/entities/GenericTypes");
var Method_1 = require("../../../modules/method/entities/Method");
var Import_1 = require("../../../modules/imports/entities/Import");
var Interface_1 = require("../../../modules/interface/entities/Interface");
var Type_1 = require("../../../modules/type/entities/Type");
var PatternFactory_1 = require("../../../shared/utils/PatternFactory");
var Generator = /** @class */ (function (_super) {
    __extends(Generator, _super);
    function Generator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Generator.create = function (config, opt) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        var options = __assign(__assign({}, opt), { type: config.type });
        return new Generator({
            name: config.name,
            type: config.type,
            imports: (_b = (_a = config.imports) === null || _a === void 0 ? void 0 : _a.map(function (imp) { return Import_1.Import.create(imp, options); })) !== null && _b !== void 0 ? _b : [],
            extends: (_d = (_c = config.extends) === null || _c === void 0 ? void 0 : _c.map(function (generic) { return GenericTypes_1.GenericType.create(generic, options); })) !== null && _d !== void 0 ? _d : [],
            implements: (_f = (_e = config.implements) === null || _e === void 0 ? void 0 : _e.map(function (generic) { return GenericTypes_1.GenericType.create(generic, options); })) !== null && _f !== void 0 ? _f : [],
            annotations: (_g = config.annotations) !== null && _g !== void 0 ? _g : [],
            methods: (_j = (_h = config.methods) === null || _h === void 0 ? void 0 : _h.map(function (mt) { return Method_1.Method.create(mt, options); })) !== null && _j !== void 0 ? _j : [],
            interfaces: (_l = (_k = config.interfaces) === null || _k === void 0 ? void 0 : _k.map(function (inter) { return Interface_1.Interface.create(inter, options); })) !== null && _l !== void 0 ? _l : [],
            types: (_o = (_m = config.types) === null || _m === void 0 ? void 0 : _m.map(function (t) { return Type_1.Type.create(t, options); })) !== null && _o !== void 0 ? _o : [],
            pattern: (_p = config.pattern) !== null && _p !== void 0 ? _p : './-{name}-/-{module}-/',
            module: options.module,
            file: options.file,
            filename: (_q = config.filename) !== null && _q !== void 0 ? _q : '-{file}-',
            test: (_r = config.test) !== null && _r !== void 0 ? _r : 'unit',
            alias: (_s = config.alias) !== null && _s !== void 0 ? _s : null
        });
    };
    Object.defineProperty(Generator.prototype, "name", {
        get: function () {
            return PatternFactory_1.PatterFactory.create(this.props.name, this.props);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Generator.prototype, "filename", {
        get: function () {
            return PatternFactory_1.PatterFactory.create(this.props.filename, this.props);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Generator.prototype, "type", {
        get: function () {
            return this.props.type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Generator.prototype, "imports", {
        get: function () {
            return this.props.imports;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Generator.prototype, "extends", {
        get: function () {
            return this.props.extends;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Generator.prototype, "annotations", {
        get: function () {
            return this.props.annotations;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Generator.prototype, "methods", {
        get: function () {
            return this.props.methods;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Generator.prototype, "interfaces", {
        get: function () {
            return this.props.interfaces;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Generator.prototype, "types", {
        get: function () {
            return this.props.types;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Generator.prototype, "path", {
        get: function () {
            return PatternFactory_1.PatterFactory.create(this.props.pattern, this.props);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Generator.prototype, "test", {
        get: function () {
            return this.props.test;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Generator.prototype, "implements", {
        get: function () {
            return this.props.implements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Generator.prototype, "alias", {
        get: function () {
            return this.props.alias;
        },
        enumerable: false,
        configurable: true
    });
    return Generator;
}(Entity_1.Entity));
exports.Generator = Generator;
