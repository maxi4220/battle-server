import odbc, { Connection } from "odbc";

export class SqlData {
  cnn: Connection;
  private config: string = "DSN=" + process.env.sql_dsn;

  constructor(){ }

  async connect() {
    return this.cnn = await odbc.connect(this.config);
  }
}