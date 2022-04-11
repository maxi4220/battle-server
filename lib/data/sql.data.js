"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlData = void 0;
const mysql_1 = __importDefault(require("mysql"));
const db_config_1 = __importDefault(require("../db.config"));
class SqlData {
    constructor() { }
    connect() {
        return this.cnn = mysql_1.default.createConnection({
            host: db_config_1.default.HOST,
            user: db_config_1.default.USER,
            password: db_config_1.default.PASSWORD,
            database: db_config_1.default.DB
        });
        ;
    }
}
exports.SqlData = SqlData;
