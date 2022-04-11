"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_config = {
    HOST: process.env.sql_host,
    USER: process.env.sql_user,
    PASSWORD: process.env.sql_password,
    DB: process.env.sql_db
};
exports.default = sql_config;
