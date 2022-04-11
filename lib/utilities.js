"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utilities {
    /**
     * Returns current date ready for DB
     */
    static DateNow() {
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
}
exports.default = Utilities;
