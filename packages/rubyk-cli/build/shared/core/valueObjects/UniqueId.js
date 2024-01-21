"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueId = void 0;
var crypto_1 = require("crypto");
var UniqueId = /** @class */ (function () {
    function UniqueId(value) {
        this._value = value;
    }
    UniqueId.generate = function () {
        var newId = (0, crypto_1.randomUUID)();
        return new UniqueId(newId);
    };
    UniqueId.reconstitute = function (value) {
        return new UniqueId(value);
    };
    Object.defineProperty(UniqueId.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    UniqueId.prototype.toString = function () {
        return this._value;
    };
    UniqueId.prototype.equals = function (other) {
        if (this === other)
            return true;
        return other.value === this.value;
    };
    return UniqueId;
}());
exports.UniqueId = UniqueId;
