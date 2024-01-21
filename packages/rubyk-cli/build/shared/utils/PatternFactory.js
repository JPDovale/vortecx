"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatterFactory = void 0;
var PatterFactory = /** @class */ (function () {
    function PatterFactory() {
    }
    PatterFactory.create = function (pattern, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        return pattern.trim().replace(' ', '')
            .replace('-{module}-', (_a = options.module) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase())
            .replace('-{name}-', (_b = options.name) === null || _b === void 0 ? void 0 : _b.toLocaleLowerCase())
            .replace('-{file}-', (_c = options.file) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase())
            .replace('-{type}-', (_d = options.type) === null || _d === void 0 ? void 0 : _d.toLocaleLowerCase())
            .replace('-{^type}-', ((_e = options.type[0]) === null || _e === void 0 ? void 0 : _e.toLocaleUpperCase()) + ((_f = options.type) === null || _f === void 0 ? void 0 : _f.slice(1)))
            .replace('-{^module}-', ((_g = options.module[0]) === null || _g === void 0 ? void 0 : _g.toLocaleUpperCase()) + ((_h = options.module) === null || _h === void 0 ? void 0 : _h.slice(1)))
            .replace('-{^name}-', ((_j = options.name[0]) === null || _j === void 0 ? void 0 : _j.toLocaleUpperCase()) + ((_k = options.name) === null || _k === void 0 ? void 0 : _k.slice(1)))
            .replace('-{^file}-', ((_l = options.file[0]) === null || _l === void 0 ? void 0 : _l.toLocaleUpperCase()) + ((_m = options.file) === null || _m === void 0 ? void 0 : _m.slice(1)))
            .replace('-{^^type}-', ((_o = options.type[0]) === null || _o === void 0 ? void 0 : _o.toLocaleUpperCase()) + ((_p = options.type) === null || _p === void 0 ? void 0 : _p.slice(1)))
            .replace('-{^^module}-', (_q = options.module) === null || _q === void 0 ? void 0 : _q.toLocaleUpperCase())
            .replace('-{^^name}-', (_r = options.name) === null || _r === void 0 ? void 0 : _r.toLocaleUpperCase())
            .replace('-{^^file}-', (_s = options.file) === null || _s === void 0 ? void 0 : _s.toLocaleUpperCase());
    };
    return PatterFactory;
}());
exports.PatterFactory = PatterFactory;
