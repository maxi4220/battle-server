import mysql from "mysql";
import sql_config from "../db.config"

export class SqlData {
  cnn: mysql.Connection;
  constructor(){ }

  connect() {
    return this.cnn = mysql.createConnection({
      host: sql_config.HOST,
      user: sql_config.USER,
      password: sql_config.PASSWORD,
      database: sql_config.DB
    });;
  }
}