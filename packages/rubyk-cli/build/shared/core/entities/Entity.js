"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
var Entity = /** @class */ (function () {
    function Entity(props) {
        this._props = props;
    }
    Object.defineProperty(Entity.prototype, "props", {
        get: function () {
            return this._props;
        },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.equals = function (other) {
        if (this === other)
            return true;
        if (JSON.stringify(this.props) === JSON.stringify(other.props)) {
            return true;
        }
        return false;
    };
    return Entity;
}());
exports.Entity = Entity;
