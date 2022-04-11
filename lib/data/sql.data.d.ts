import mysql from "mysql";
export declare class SqlData {
    cnn: mysql.Connection;
    constructor();
    connect(): mysql.Connection;
}
